#!/usr/bin/env python3
"""Extraction Google Search Console -> CSV. Idempotent, pagine, throttle."""
import os, json, time, argparse, pathlib, datetime as dt
import pandas as pd
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
MAX_ROWS = 25000


def client():
    sa = os.environ.get("GSC_SA_JSON")
    if not sa:
        default_sa = pathlib.Path.home() / ".config/gsc/sa.json"
        if default_sa.exists():
            sa = str(default_sa)
    if sa and pathlib.Path(sa).exists():
        creds = service_account.Credentials.from_service_account_file(sa, scopes=SCOPES)
    else:
        tok = pathlib.Path.home() / ".config/gsc/token.json"
        if not tok.exists():
            raise SystemExit("Aucun credential GSC. Voir Phase 0.")
        creds = Credentials.from_authorized_user_file(str(tok), SCOPES)
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def query(svc, site, start, end, dims, dtype="web", filters=None, state="all"):
    """Pagine jusqu'a epuisement. Renvoie une liste de dicts a plat."""
    rows, start_row = [], 0
    while True:
        body = {
            "startDate": start, "endDate": end,
            "dimensions": dims, "type": dtype,
            "rowLimit": MAX_ROWS, "startRow": start_row,
            "dataState": state,
        }
        if filters:
            body["dimensionFilterGroups"] = [{"filters": filters}]
        resp = svc.searchanalytics().query(siteUrl=site, body=body).execute()
        batch = resp.get("rows", [])
        for r in batch:
            rec = dict(zip(dims, r.get("keys", [])))
            rec.update(clicks=r["clicks"], impressions=r["impressions"],
                       ctr=r["ctr"], position=r["position"])
            rows.append(rec)
        if len(batch) < MAX_ROWS:
            break
        start_row += MAX_ROWS
        time.sleep(0.2)
    return rows


def window(days_ago_start, days_ago_end, lag=3):
    """Fenetre glissante en excluant les `lag` derniers jours (non finalises)."""
    today = dt.date.today()
    end = today - dt.timedelta(days=lag + days_ago_end)
    start = today - dt.timedelta(days=lag + days_ago_start)
    return start.isoformat(), end.isoformat()


def dump(rows, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(rows).to_csv(path, index=False)
    print(f"{path}  {len(rows)} lignes")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site")
    ap.add_argument("--out", default="data")
    ap.add_argument("--list-sites", action="store_true")
    a = ap.parse_args()
    svc = client()

    if a.list_sites:
        for s in svc.sites().list().execute().get("siteEntry", []):
            print(s["permissionLevel"], s["siteUrl"])
        return

    out = pathlib.Path(a.out)
    d28 = window(28, 0)
    dprev = window(56, 28)
    dyoy = window(365 + 28, 365)
    d90 = window(90, 0)
    d16m = window(485, 0)

    dump(query(svc, a.site, *d16m, ["date"]), out / "daily.csv")
    dump(query(svc, a.site, *d28, ["query"]), out / "query_28.csv")
    dump(query(svc, a.site, *dprev, ["query"]), out / "query_28_prev.csv")
    dump(query(svc, a.site, *dyoy, ["query"]), out / "query_28_yoy.csv")
    dump(query(svc, a.site, *d28, ["page"]), out / "page_28.csv")
    dump(query(svc, a.site, *dprev, ["page"]), out / "page_28_prev.csv")
    dump(query(svc, a.site, *d90, ["query", "page"]), out / "query_page_90.csv")
    dump(query(svc, a.site, *d16m, ["page", "date"]), out / "page_month.csv")
    dump(query(svc, a.site, *d90, ["query", "device"]), out / "query_device.csv")
    dump(query(svc, a.site, *d90, ["query", "country"]), out / "query_country.csv")
    dump(query(svc, a.site, *d90, ["searchAppearance"]), out / "appearance.csv")

    totals = {}
    for name, w in {"d28": d28, "prev": dprev, "d90": d90}.items():
        r = query(svc, a.site, *w, [])
        totals[name] = r[0] if r else {}
    (out / "totals.json").write_text(json.dumps(totals, indent=2))
    print("totals.json")


if __name__ == "__main__":
    main()


# --- Phase 4 : URL Inspection (throttle + cache journalier) -------------
def inspect_urls(svc, site, urls, cache_path, sleep=0.12):
    import datetime as _dt
    cache_path = pathlib.Path(cache_path)
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    today = _dt.date.today().isoformat()
    cache = json.loads(cache_path.read_text()) if cache_path.exists() else {}
    out = []
    for u in urls:
        key = f"{today}|{u}"
        if key in cache:
            out.append(cache[key]); continue
        try:
            r = svc.urlInspection().index().inspect(
                body={"inspectionUrl": u, "siteUrl": site}).execute()
            idx = r.get("inspectionResult", {}).get("indexStatusResult", {})
            rec = {
                "url": u,
                "coverageState": idx.get("coverageState"),
                "robotsTxtState": idx.get("robotsTxtState"),
                "indexingState": idx.get("indexingState"),
                "pageFetchState": idx.get("pageFetchState"),
                "lastCrawlTime": idx.get("lastCrawlTime"),
                "userCanonical": idx.get("userCanonical"),
                "googleCanonical": idx.get("googleCanonical"),
                "verdict": r.get("inspectionResult", {}).get("indexStatusResult", {}).get("verdict"),
            }
        except Exception as e:
            rec = {"url": u, "error": str(e)[:200]}
        cache[key] = rec
        out.append(rec)
        time.sleep(sleep)
    cache_path.write_text(json.dumps(cache, indent=1))
    return out

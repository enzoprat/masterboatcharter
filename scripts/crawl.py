#!/usr/bin/env python3
"""Crawl local, 2 req/s max, robots.txt respecte. -> .seo/crawl.sqlite"""
import re, json, time, sqlite3, pathlib, urllib.parse as up, urllib.request as ur
import urllib.robotparser as rp

UA = "Mozilla/5.0 (compatible; SEO-audit-local/1.0)"
ROOT = "https://www.masterboatcharter.com"
DB = pathlib.Path(".seo/crawl.sqlite")


def fetch(url):
    req = ur.Request(url, headers={"User-Agent": UA})
    t0 = time.time()
    with ur.urlopen(req, timeout=30) as r:
        body = r.read().decode("utf-8", "replace")
        return r.status, body, r.geturl(), round((time.time() - t0) * 1000)


def tag(html, pat, flags=re.I | re.S):
    m = re.search(pat, html, flags)
    return m.group(1).strip() if m else None


def crawl(urls):
    robots = rp.RobotFileParser()
    robots.set_url(ROOT + "/robots.txt")
    robots.read()
    DB.parent.mkdir(exist_ok=True)
    con = sqlite3.connect(DB)
    con.execute("""CREATE TABLE IF NOT EXISTS pages(
        url TEXT PRIMARY KEY, status INT, final_url TEXT, ms INT,
        title TEXT, title_len INT, meta_desc TEXT, meta_desc_len INT,
        h1 TEXT, h1_count INT, h2 TEXT, canonical TEXT, lang TEXT,
        hreflang TEXT, words INT, imgs INT, imgs_no_alt INT,
        imgs_no_dim INT, links_int INT, jsonld TEXT)""")
    for u in urls:
        if not robots.can_fetch(UA, u):
            print("robots interdit:", u); continue
        try:
            st, html, final, ms = fetch(u)
        except Exception as e:
            print("ERR", u, e); continue
        h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.I | re.S)
        h2s = re.findall(r"<h2[^>]*>(.*?)</h2>", html, re.I | re.S)
        strip = lambda s: re.sub(r"<[^>]+>", "", s).strip()
        imgs = re.findall(r"<img\b[^>]*>", html, re.I)
        body_txt = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.I | re.S)
        body_txt = re.sub(r"<[^>]+>", " ", body_txt)
        jsonld = re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.I | re.S)
        types = []
        for blk in jsonld:
            try:
                data = json.loads(blk)
                t = data.get("@type")
                types.append(",".join(t) if isinstance(t, list) else str(t))
            except Exception:
                types.append("INVALIDE")
        con.execute("INSERT OR REPLACE INTO pages VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (
            u, st, final, ms,
            tag(html, r"<title[^>]*>(.*?)</title>"),
            len(tag(html, r"<title[^>]*>(.*?)</title>") or ""),
            tag(html, r'<meta name="description" content="([^"]*)"'),
            len(tag(html, r'<meta name="description" content="([^"]*)"') or ""),
            strip(h1s[0]) if h1s else None, len(h1s),
            " | ".join(strip(h) for h in h2s[:12]),
            tag(html, r'<link rel="canonical" href="([^"]*)"'),
            tag(html, r'<html[^>]*lang="([^"]*)"'),
            ";".join(re.findall(r'hrefLang="([^"]*)"', html)),
            len(body_txt.split()),
            len(imgs),
            sum(1 for i in imgs if 'alt=' not in i.lower()),
            sum(1 for i in imgs if 'width=' not in i.lower()),
            len(set(re.findall(r'href="(/[^"#?]*)"', html))),
            "|".join(types),
        ))
        con.commit()
        print(f"{st} {ms:>5}ms  {u}")
        time.sleep(0.5)
    con.close()


if __name__ == "__main__":
    import pandas as pd
    urls = pd.read_csv("data/gsc/page_28.csv").page.tolist()
    urls = [u for u in urls if u.startswith(ROOT)]
    urls = sorted(set(urls))
    crawl(urls)

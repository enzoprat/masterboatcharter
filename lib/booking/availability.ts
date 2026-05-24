import { SLOTS, type SlotKey } from '@/lib/data/activities';

/**
 * Mock booking data (in-memory). In production this becomes a DB query
 * (Supabase, Postgres, etc). The shape stays the same.
 */
export type ExistingBooking = {
  date: string; // YYYY-MM-DD
  slot: SlotKey;
};

// A small, deterministic-ish set of "already booked" slots for demo purposes.
// We tag a handful of upcoming days so the UI clearly shows conflicts.
function pseudoBookings(): ExistingBooking[] {
  const today = new Date();
  const out: ExistingBooking[] = [];
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const day = d.getDay();
    const iso = d.toISOString().slice(0, 10);
    // Saturdays: full day booked
    if (day === 6) out.push({ date: iso, slot: 'full' });
    // Every Tuesday: morning booked
    if (day === 2) out.push({ date: iso, slot: 'morning' });
    // Every Friday: sunset booked
    if (day === 5) out.push({ date: iso, slot: 'sunset' });
  }
  return out;
}

const DEMO_BOOKINGS = pseudoBookings();

/** Returns the slots blocked on `date` given existing bookings. */
export function getBlockedSlots(
  date: string,
  bookings: ExistingBooking[] = DEMO_BOOKINGS
): Set<SlotKey> {
  const blocked = new Set<SlotKey>();
  for (const b of bookings) {
    if (b.date !== date) continue;
    for (const k of SLOTS[b.slot].blocks) {
      blocked.add(k);
    }
  }
  return blocked;
}

/** True if the chosen slot is available on the chosen date. */
export function isSlotAvailable(date: string, slot: SlotKey): boolean {
  return !getBlockedSlots(date).has(slot);
}

/** Helper: format date for input fields */
export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Helper: today at start-of-day */
export function todayISO(): string {
  return toISODate(new Date());
}

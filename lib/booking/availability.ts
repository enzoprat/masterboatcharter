import { SLOTS, type SlotKey } from '@/lib/data/activities';

/**
 * Booking source (in-memory). In production this becomes a DB query
 * (Supabase, Postgres, etc). The shape stays the same.
 */
export type ExistingBooking = {
  date: string; // YYYY-MM-DD
  slot: SlotKey;
};

/**
 * Real bookings, once there is a backend to read them from. Until then this
 * stays empty: blocking a date the captain never blocked costs a booking.
 */
const BOOKINGS: ExistingBooking[] = [];

/** Returns the slots blocked on `date` given existing bookings. */
export function getBlockedSlots(
  date: string,
  bookings: ExistingBooking[] = BOOKINGS
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

/**
 * Helper: format date for input fields.
 *
 * Uses the local calendar fields, not `toISOString()` — the calendar builds
 * its cells at local midnight, which in any timezone east of Greenwich
 * (France, Germany, Seychelles) converts back to the *previous* day in UTC.
 */
export function toISODate(d: Date): string {
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

/** Helper: today at start-of-day */
export function todayISO(): string {
  return toISODate(new Date());
}

import { PARTY_MAX, hours, type Daypart } from "@/data/site";

export interface ReservationValues {
  party: number;
  /** YYYY-MM-DD, in the guest's local time. */
  date: string;
  /** 24 hour HH:MM, one of the slots offered for that date. */
  time: string;
  name: string;
  email: string;
  notes: string;
}

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;

export interface Slot {
  /** HH:MM, 24 hour. */
  value: string;
  /** For people: 6:30 PM. */
  label: string;
  daypart: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** A local calendar date as YYYY-MM-DD (not UTC, so late evenings do not roll over a day). */
export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parses YYYY-MM-DD as a local date at noon, or null when it is not a real calendar date. */
export function parseISODate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d, 12);
  const real = date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
  return real ? date : null;
}

export function formatTime(value: string): string {
  const [h, m] = value.split(":").map(Number) as [number, number];
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${pad(m)} ${suffix}`;
}

function minutes(value: string): number {
  const [h, m] = value.split(":").map(Number) as [number, number];
  return h * 60 + m;
}

function dayparts(date: Date): Daypart[] {
  return hours.find((h) => h.days.includes(date.getDay()))?.dayparts ?? [];
}

/**
 * Times that can be asked for on a date: every half hour from opening to the last seating. When the
 * date is today, times that have already passed (or start in under 45 minutes) are left out. This is
 * not availability: the restaurant is fictional, so nothing here knows what is booked.
 */
export function slotsFor(date: Date, now: Date = new Date()): Slot[] {
  const isToday = toISODate(date) === toISODate(now);
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + 45 : 0;
  const out: Slot[] = [];
  for (const part of dayparts(date)) {
    for (let t = minutes(part.opens); t <= minutes(part.lastSeating); t += 30) {
      if (t < earliest) continue;
      const value = `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
      out.push({ value, label: formatTime(value), daypart: part.label });
    }
  }
  return out;
}

export interface DayChip {
  value: string;
  weekday: string;
  day: number;
  month: string;
}

/** The next `count` days starting today, for the quick date picker. */
export function nextDays(count: number, now: Date = new Date()): DayChip[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 12);
    return {
      value: toISODate(d),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  });
}

export function formatLongDate(value: string): string {
  const d = parseISODate(value);
  return d
    ? d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : value;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Required fields, a believable email, a date from today on, and a time that exists that day. */
export function validateReservation(
  values: ReservationValues,
  now: Date = new Date(),
): ReservationErrors {
  const errors: ReservationErrors = {};

  if (!Number.isInteger(values.party) || values.party < 1 || values.party > PARTY_MAX) {
    errors.party = `Choose a party of 1 to ${PARTY_MAX}. For larger groups, send a private dining enquiry.`;
  }

  const date = parseISODate(values.date);
  if (!values.date) errors.date = "Choose a date.";
  else if (!date) errors.date = "That date does not look right.";
  else if (values.date < toISODate(now)) errors.date = "Choose today or a day in the future.";

  if (!values.time) errors.time = "Choose a time.";
  else if (date && !slotsFor(date, now).some((s) => s.value === values.time)) {
    errors.time = "That time is not offered on the day you chose. Pick another.";
  }

  if (!values.name.trim()) errors.name = "Tell us who the table is for.";

  if (!values.email.trim()) errors.email = "Add an email address so the request has a reply-to.";
  else if (!EMAIL.test(values.email.trim()))
    errors.email = "That email address does not look right.";

  return errors;
}

import { describe, expect, it } from "vitest";

import {
  formatTime,
  nextDays,
  parseISODate,
  slotsFor,
  toISODate,
  validateReservation,
  type ReservationValues,
} from "@/lib/reservation";

// Mon 2026-11-02, Sat 2026-11-07, Sun 2026-11-08 (local noon, so no timezone drift)
const day = (iso: string) => parseISODate(iso)!;
const morning = new Date(2026, 9, 25, 9, 0);

describe("dates", () => {
  it("formats and parses local dates, rejecting impossible ones", () => {
    expect(toISODate(new Date(2026, 10, 2, 23, 59))).toBe("2026-11-02");
    expect(parseISODate("2026-02-30")).toBeNull();
    expect(parseISODate("not a date")).toBeNull();
    expect(parseISODate("2026-11-02")?.getDate()).toBe(2);
  });

  it("lists the next days starting today", () => {
    const days = nextDays(14, morning);
    expect(days).toHaveLength(14);
    expect(days[0]?.value).toBe("2026-10-25");
    expect(days[7]?.value).toBe("2026-11-01");
  });

  it("writes times for people", () => {
    expect(formatTime("17:00")).toBe("5:00 PM");
    expect(formatTime("12:30")).toBe("12:30 PM");
    expect(formatTime("10:00")).toBe("10:00 AM");
  });
});

describe("slots", () => {
  it("offers weeknight dinner from 5:00 to a 9:30 last seating", () => {
    const s = slotsFor(day("2026-11-02"), morning);
    expect(s[0]?.label).toBe("5:00 PM");
    expect(s.at(-1)?.label).toBe("9:30 PM");
    expect(s).toHaveLength(10);
  });

  it("runs an hour later on Friday and Saturday", () => {
    expect(slotsFor(day("2026-11-07"), morning).at(-1)?.label).toBe("10:30 PM");
  });

  it("splits Sunday into brunch and dinner", () => {
    const s = slotsFor(day("2026-11-08"), morning);
    const brunch = s.filter((x) => x.daypart === "Brunch");
    const dinner = s.filter((x) => x.daypart === "Dinner");
    expect(brunch[0]?.label).toBe("10:00 AM");
    expect(brunch.at(-1)?.label).toBe("1:30 PM");
    expect(dinner[0]?.label).toBe("5:00 PM");
    expect(dinner.at(-1)?.label).toBe("8:30 PM");
  });

  it("leaves out times that have passed or start within 45 minutes when the date is today", () => {
    const sixPm = new Date(2026, 10, 2, 18, 0); // Monday 6:00 PM
    expect(slotsFor(day("2026-11-02"), sixPm)[0]?.label).toBe("7:00 PM");
    const lateNight = new Date(2026, 10, 2, 22, 0);
    expect(slotsFor(day("2026-11-02"), lateNight)).toHaveLength(0);
  });
});

describe("validation", () => {
  const good: ReservationValues = {
    party: 4,
    date: "2026-11-02",
    time: "19:00",
    name: "Alex Rivera",
    email: "alex@example.com",
    notes: "",
  };

  it("accepts a complete request", () => {
    expect(validateReservation(good, morning)).toEqual({});
  });

  it("requires every field", () => {
    const e = validateReservation({ ...good, date: "", time: "", name: " ", email: "" }, morning);
    expect(Object.keys(e)).toEqual(["date", "time", "name", "email"]);
  });

  it("rejects past dates, impossible dates and unusual party sizes", () => {
    expect(validateReservation({ ...good, date: "2026-10-24" }, morning).date).toMatch(
      /future|today/,
    );
    expect(validateReservation({ ...good, date: "2026-02-30" }, morning).date).toMatch(/right/);
    expect(validateReservation({ ...good, party: 0 }, morning).party).toBeDefined();
    expect(validateReservation({ ...good, party: 9 }, morning).party).toMatch(/private dining/);
  });

  it("rejects a time the restaurant does not offer that day", () => {
    expect(validateReservation({ ...good, time: "23:00" }, morning).time).toMatch(/not offered/);
    expect(validateReservation({ ...good, time: "11:00" }, morning).time).toBeDefined();
  });

  it("rejects a malformed email", () => {
    expect(validateReservation({ ...good, email: "alex@" }, morning).email).toMatch(/right/);
  });
});

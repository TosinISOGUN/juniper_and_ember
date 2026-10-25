import { CheckCircle, Minus, Plus, WarningCircle } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";

import { PARTY_MAX } from "@/data/site";
import {
  formatLongDate,
  formatTime,
  nextDays,
  parseISODate,
  slotsFor,
  toISODate,
  validateReservation,
  type ReservationErrors,
  type ReservationValues,
} from "@/lib/reservation";

const empty: ReservationValues = { party: 2, date: "", time: "", name: "", email: "", notes: "" };

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function Group({
  legend,
  error,
  errorId,
  children,
}: {
  legend: string;
  error: string | undefined;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="grid gap-3" aria-describedby={error ? errorId : undefined}>
      <legend className="field-label mb-1">{legend}</legend>
      {children}
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

/**
 * A request form for a table. It checks every field, offers only times that exist on the chosen day
 * and says plainly, in the confirmation, that nothing was booked: this is a demo with no backend,
 * so it has no idea what is available. It is shaped so a booking provider could replace
 * `submit` later.
 */
export function ReservationForm() {
  const [values, setValues] = useState<ReservationValues>(empty);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [now, setNow] = useState<Date | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);

  // "Today" is read in the browser, so the server-rendered page never offers a stale date.
  useEffect(() => setNow(new Date()), []);

  const days = useMemo(() => (now ? nextDays(14, now) : []), [now]);
  const chosen = parseISODate(values.date);
  const slots = useMemo(() => (chosen && now ? slotsFor(chosen, now) : []), [chosen, now]);
  const groups = useMemo(
    () =>
      slots.reduce<Record<string, typeof slots>>((acc, s) => {
        (acc[s.daypart] ??= []).push(s);
        return acc;
      }, {}),
    [slots],
  );
  const customDate = values.date !== "" && !days.some((d) => d.value === values.date);

  useEffect(() => {
    if (status === "done") heading.current?.focus();
  }, [status]);

  const set = <K extends keyof ReservationValues>(key: K, value: ReservationValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function chooseDate(date: string) {
    const d = parseISODate(date);
    const stillValid = d && now ? slotsFor(d, now).some((s) => s.value === values.time) : false;
    setValues((v) => ({ ...v, date, time: stillValid ? v.time : "" }));
    setErrors((e) => {
      const next = { ...e };
      delete next.date;
      if (!stillValid) delete next.time;
      return next;
    });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const found = validateReservation(values, now ?? new Date());
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      const target = form.current?.querySelector<HTMLElement>(
        `[data-field="${first}"] input, [data-field="${first}"] button, [data-field="${first}"] textarea`,
      );
      target?.focus();
      return;
    }
    setStatus("sending");
    // A demo: nothing is sent. A real build would call a booking provider here.
    window.setTimeout(() => setStatus("done"), 900);
  }

  function reset() {
    setValues(empty);
    setErrors({});
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div className="ticket" aria-live="polite">
        <div className="p-6 sm:p-8">
          <p className="eyebrow">Demo request, not a booking</p>
          <h3 ref={heading} tabIndex={-1} className="display-md mt-3 outline-none">
            Thanks, {values.name.trim()}. Here is what you asked for.
          </h3>
          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="eyebrow !text-muted">Party</dt>
              <dd className="font-display text-2xl">
                {values.party} {values.party === 1 ? "guest" : "guests"}
              </dd>
            </div>
            <div>
              <dt className="eyebrow !text-muted">When</dt>
              <dd className="font-display text-2xl">
                {formatLongDate(values.date)}, {formatTime(values.time)}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="eyebrow !text-muted">Reply-to</dt>
              <dd className="break-all">{values.email}</dd>
            </div>
            {values.notes.trim() && (
              <div className="sm:col-span-2">
                <dt className="eyebrow !text-muted">Your note</dt>
                <dd>{values.notes}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="ticket-stub p-6 sm:p-8">
          <p className="notice flex gap-3">
            <CheckCircle
              size={22}
              weight="fill"
              className="mt-0.5 shrink-0 text-accent-text"
              aria-hidden
            />
            <span>
              <strong>No real reservation was made.</strong> Juniper &amp; Ember is a fictional
              restaurant, so this request went nowhere and no table is being held.
            </span>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/menu" className="btn btn-solid">
              Browse the menu
            </Link>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Start another request
            </button>
          </div>
        </div>
      </div>
    );
  }

  const today = now ? toISODate(now) : undefined;
  const max = now
    ? toISODate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 120))
    : undefined;

  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className="ticket grid gap-8 p-6 sm:p-8"
      aria-busy={status === "sending"}
    >
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="notice">
          {Object.keys(errors).length === 1
            ? "One thing needs a look:"
            : "A few things need a look:"}{" "}
          the fields below are marked.
        </p>
      )}

      <div data-field="party">
        <Group legend="Party size" error={errors.party} errorId="err-party">
          <div className="flex flex-wrap items-center gap-4">
            <div className="stepper">
              <button
                type="button"
                aria-label="One fewer guest"
                disabled={values.party <= 1}
                onClick={() => set("party", values.party - 1)}
              >
                <Minus size={16} aria-hidden />
              </button>
              <output aria-live="polite" aria-label="Guests">
                {values.party}
              </output>
              <button
                type="button"
                aria-label="One more guest"
                disabled={values.party >= PARTY_MAX}
                onClick={() => set("party", values.party + 1)}
              >
                <Plus size={16} aria-hidden />
              </button>
            </div>
            <p className="field-hint">
              Up to {PARTY_MAX} online. Nine or more?{" "}
              <Link to="/contact" className="underline underline-offset-4">
                Ask about private dining
              </Link>
              .
            </p>
          </div>
        </Group>
      </div>

      <div data-field="date">
        <Group legend="Date" error={errors.date} errorId="err-date">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Next two weeks">
            {days.map((d, i) => (
              <label key={d.value} className="choice choice-date">
                <input
                  type="radio"
                  name="date"
                  value={d.value}
                  checked={values.date === d.value}
                  onChange={() => chooseDate(d.value)}
                  aria-invalid={Boolean(errors.date)}
                />
                <span>
                  <small>{i === 0 ? "Today" : d.weekday}</small>
                  <b>{d.day}</b>
                  <small>{d.month}</small>
                </span>
              </label>
            ))}
            {days.length === 0 && <p className="field-hint">Loading dates...</p>}
          </div>
          <div className="field max-w-xs">
            <label htmlFor="res-date" className="text-sm text-muted">
              Or pick another day
            </label>
            <input
              id="res-date"
              type="date"
              className="input"
              min={today}
              max={max}
              value={customDate ? values.date : ""}
              onChange={(e) => chooseDate(e.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "err-date" : undefined}
            />
          </div>
        </Group>
      </div>

      <div data-field="time">
        <Group legend="Preferred time" error={errors.time} errorId="err-time">
          {!chosen && (
            <p className="field-hint">Choose a date to see the times we serve that day.</p>
          )}
          {chosen && slots.length === 0 && (
            <p className="field-hint">
              No times are left on that day. Try tomorrow or another date.
            </p>
          )}
          {Object.entries(groups).map(([part, list]) => (
            <div key={part} role="radiogroup" aria-label={`${part} times`}>
              {Object.keys(groups).length > 1 && <p className="eyebrow mb-2 !text-muted">{part}</p>}
              <div className="flex flex-wrap gap-2">
                {list.map((s) => (
                  <label key={s.value} className="choice">
                    <input
                      type="radio"
                      name="time"
                      value={s.value}
                      checked={values.time === s.value}
                      onChange={() => set("time", s.value)}
                      aria-invalid={Boolean(errors.time)}
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {chosen && slots.length > 0 && (
            <p className="field-hint">
              These are the times we seat on that day, not live availability.
            </p>
          )}
        </Group>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field" data-field="name">
          <label htmlFor="res-name">Name</label>
          <input
            id="res-name"
            className="input"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          <FieldError id="err-name" message={errors.name} />
        </div>
        <div className="field" data-field="email">
          <label htmlFor="res-email">Email</label>
          <input
            id="res-email"
            className="input"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          <FieldError id="err-email" message={errors.email} />
        </div>
        <div className="field sm:col-span-2" data-field="notes">
          <label htmlFor="res-notes">
            Notes <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="res-notes"
            className="input"
            rows={3}
            placeholder="A celebration, a high chair, a quiet corner..."
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending your request..." : "Request a table"}
        </button>
        <p className="mt-4 max-w-[60ch] text-sm text-muted">
          Demo form. Nothing you type leaves this page, nothing is saved, and no availability is
          checked.{" "}
          <Link to="/privacy" className="underline underline-offset-4">
            Privacy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

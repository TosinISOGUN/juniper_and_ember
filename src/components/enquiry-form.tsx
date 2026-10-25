import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useRef, useState, type FormEvent } from "react";

import { validateEnquiry, type EnquiryErrors, type EnquiryValues } from "@/lib/forms";

const topics = [
  "Private dining and events",
  "Press and partnerships",
  "Just saying hello",
] as const;

type Values = EnquiryValues;
type Errors = EnquiryErrors;

function Err({ id, text }: { id: string; text: string | undefined }) {
  if (!text) return null;
  return (
    <p id={id} className="field-error">
      <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" aria-hidden />
      {text}
    </p>
  );
}

/** A demo enquiry form: it checks the fields, then says clearly that nothing was sent. */
export function EnquiryForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    topic: topics[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="ticket p-6 sm:p-8" aria-live="polite">
        <p className="eyebrow">Demo enquiry</p>
        <h3 className="display-md mt-3">Thanks, {values.name.trim()}.</h3>
        <p className="notice mt-5 flex gap-3">
          <CheckCircle
            size={22}
            weight="fill"
            className="mt-0.5 shrink-0 text-accent-text"
            aria-hidden
          />
          <span>
            <strong>Nothing was sent.</strong> This is a form on a fictional restaurant&apos;s site,
            so no one will read your message and nothing was stored.
          </span>
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-5"
          onClick={() => {
            setDone(false);
            setValues({ name: "", email: "", topic: topics[0], message: "" });
          }}
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="ticket grid gap-5 p-6 sm:p-8">
      <div>
        <h3 className="display-sm">Send an enquiry</h3>
        <p className="mt-1 text-muted">
          Private gatherings, press, or hello. Demo only: nothing is delivered.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="enq-name">Name</label>
          <input
            id="enq-name"
            name="name"
            className="input"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-enq-name" : undefined}
          />
          <Err id="err-enq-name" text={errors.name} />
        </div>
        <div className="field">
          <label htmlFor="enq-email">Email</label>
          <input
            id="enq-email"
            name="email"
            type="email"
            inputMode="email"
            className="input"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-enq-email" : undefined}
          />
          <Err id="err-enq-email" text={errors.email} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="enq-topic">What is it about?</label>
        <select
          id="enq-topic"
          name="topic"
          className="input"
          value={values.topic}
          onChange={(e) => set("topic", e.target.value)}
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="enq-message">Message</label>
        <textarea
          id="enq-message"
          name="message"
          className="input"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "err-enq-message" : undefined}
        />
        <Err id="err-enq-message" text={errors.message} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Send enquiry
        </button>
      </div>
    </form>
  );
}

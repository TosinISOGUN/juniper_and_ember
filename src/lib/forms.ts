const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type EnquiryValues = { name: string; email: string; topic: string; message: string };
export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!v.name.trim()) e.name = "Tell us your name.";
  if (!v.email.trim()) e.email = "Add an email address.";
  else if (!EMAIL.test(v.email.trim())) e.email = "That email address does not look right.";
  if (v.message.trim().length < 10) e.message = "Write a sentence or two (at least 10 characters).";
  return e;
}

export type CheckoutValues = { name: string; phone: string; when: string; notes: string };
export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export function validateCheckout(v: CheckoutValues): CheckoutErrors {
  const e: CheckoutErrors = {};
  if (!v.name.trim()) e.name = "Tell us the name for the order.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Add a phone number for pickup.";
  else if (digits.length < 10 || digits.length > 11) e.phone = "Use a 10 digit US phone number.";
  return e;
}

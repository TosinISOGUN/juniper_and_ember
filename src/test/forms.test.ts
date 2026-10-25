import { describe, expect, it } from "vitest";

import { validateCheckout, validateEnquiry } from "@/lib/forms";

const blank = { name: "", phone: "", when: "", notes: "" };

describe("checkout form", () => {
  it("needs a name and a US phone number", () => {
    expect(Object.keys(validateCheckout(blank))).toEqual(["name", "phone"]);
    expect(validateCheckout({ ...blank, name: "Sam", phone: "123" }).phone).toMatch(/10 digit/);
    expect(validateCheckout({ ...blank, name: "Sam", phone: "(512) 555-0100" })).toEqual({});
    expect(validateCheckout({ ...blank, name: "Sam", phone: "1 512 555 0100" })).toEqual({});
  });
});

describe("enquiry form", () => {
  it("needs a name, a valid email and a real message", () => {
    const e = validateEnquiry({ name: "", email: "x", topic: "", message: "hi" });
    expect(Object.keys(e)).toEqual(["name", "email", "message"]);
    const ok = {
      name: "Sam",
      email: "sam@example.com",
      topic: "",
      message: "Do you host 20 people?",
    };
    expect(validateEnquiry(ok)).toEqual({});
  });
});

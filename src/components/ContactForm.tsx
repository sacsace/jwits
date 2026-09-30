"use client";

import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };

    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error");
      setStatus("error");
      return;
    }

    setStatus("done");
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <SectionHeading
          title={dict.contactPage.formTitle}
          description={dict.contactPage.formDesc}
        />
        <div className="space-y-5 text-sm leading-6 text-muted">
          <p>
            <span className="mb-1 block font-semibold text-ink">
              {dict.contactPage.address}
            </span>
            {dict.company.address}
          </p>
          <p>
            <span className="mb-1 block font-semibold text-ink">
              {dict.contactPage.email}
            </span>
            {dict.company.email}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 bg-surface p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">
              {dict.contactPage.name} {dict.contactPage.required}
            </span>
            <input
              name="name"
              required
              className="w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-brand"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">
              {dict.contactPage.company}
            </span>
            <input
              name="company"
              className="w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-brand"
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">
              {dict.contactPage.email} {dict.contactPage.required}
            </span>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-brand"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">
              {dict.contactPage.phone}
            </span>
            <input
              name="phone"
              className="w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-brand"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">
            {dict.contactPage.message} {dict.contactPage.required}
          </span>
          <textarea
            name="message"
            required
            rows={6}
            className="w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-brand"
          />
        </label>
        {error && <p className="text-sm text-accent">{error}</p>}
        {status === "done" && (
          <p className="text-sm text-brand">{dict.contactPage.success}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#1f3554] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16273d] disabled:opacity-60"
        >
          {status === "loading"
            ? dict.contactPage.submitting
            : dict.contactPage.submit}
        </button>
      </form>
    </div>
  );
}

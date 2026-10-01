"use client";

import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries";

const REGISTRATION_OFFICE_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7892.223317744565!2d77.69482821281407!3d12.97859251466779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b8af9c36ac1e2af%3A0xdc80cf849c3b87c1!2sJW%20Industrial%20Tech%20Service%20Private%20Limited%20(Head%20Office)!5e1!3m2!1sko!2sin!4v1790869054737!5m2!1sko!2sin";

const AP_FACTORY_OFFICE_MAP =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4082.502892541566!2d77.63121901476231!3d14.164196715619019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDA5JzQ5LjQiTiA3N8KwMzgnMDIuMiJF!5e1!3m2!1sko!2sin!4v1790869903393!5m2!1sko!2sin";

function OfficeMap({
  title,
  address,
  src,
}: {
  title: string;
  address: string;
  src: string;
}) {
  return (
    <div>
      <span className="mb-1 block font-semibold text-ink">{title}</span>
      <p>{address}</p>
      <div className="mt-4 overflow-hidden border border-line bg-surface">
        <iframe
          title={title}
          src={src}
          className="block h-[220px] w-full md:h-[260px]"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

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
        <div className="space-y-8 text-sm leading-6 text-muted">
          <OfficeMap
            title={dict.contactPage.registrationOffice}
            address={dict.company.address}
            src={REGISTRATION_OFFICE_MAP}
          />
          <OfficeMap
            title={dict.contactPage.apFactoryOffice}
            address={dict.company.apAddress}
            src={AP_FACTORY_OFFICE_MAP}
          />
          <div>
            <span className="mb-1 block font-semibold text-ink">
              {dict.contactPage.koreaOffice}
            </span>
            <p>{dict.company.koreaAddress}</p>
            <p className="mt-1 text-[13px]">{dict.company.koreaBizInfo}</p>
          </div>
          <p>
            <span className="mb-1 block font-semibold text-ink">
              {dict.contactPage.email}
            </span>
            {dict.company.email}
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="h-fit space-y-4 bg-surface p-6 md:p-8"
      >
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

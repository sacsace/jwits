"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

const REGISTRATION_OFFICE_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7892.223317744565!2d77.69482821281407!3d12.97859251466779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b8af9c36ac1e2af%3A0xdc80cf849c3b87c1!2sJW%20Industrial%20Tech%20Service%20Private%20Limited%20(Head%20Office)!5e1!3m2!1sko!2sin!4v1790869054737!5m2!1sko!2sin";

const AP_FACTORY_OFFICE_MAP =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4082.502892541566!2d77.63121901476231!3d14.164196715619019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDA5JzQ5LjQiTiA3N8KwMzgnMDIuMiJF!5e1!3m2!1sko!2sin!4v1790869903393!5m2!1sko!2sin";

const fieldClass =
  "w-full rounded border border-line bg-white px-3 py-2.5 text-[13px] text-ink outline-none transition placeholder:text-muted/55 focus:border-brand focus:ring-1 focus:ring-brand/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium tracking-[0.04em] text-muted">
        {label}
        {required ? <span className="ml-0.5 text-accent">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function OfficeCard({
  title,
  address,
  note,
  mapSrc,
}: {
  title: string;
  address: string;
  note?: string;
  mapSrc?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_0_rgba(26,29,36,0.04)]">
      {mapSrc ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-mist">
          <iframe
            title={title}
            src={mapSrc}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(145deg,#1f3554_0%,#2c4a6e_55%,#1a2230_100%)] px-5 text-center">
          <p className="font-display text-lg font-semibold tracking-tight text-white/95">
            {title}
          </p>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
          {title}
        </p>
        <p className="text-[14px] leading-6 text-ink-soft">{address}</p>
        {note ? <p className="text-[12px] leading-5 text-muted">{note}</p> : null}
      </div>
    </article>
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
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(31,53,84,0.08),transparent_58%)]"
      />

      <section className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="grid items-start gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:gap-9">
          <aside className="rise space-y-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                Contact
              </p>
              <h2 className="mt-2.5 font-display text-[1.45rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.65rem]">
                {dict.contactPage.formTitle}
              </h2>
              <p className="mt-3 max-w-sm text-[13px] leading-6 text-muted">
                {dict.contactPage.formDesc}
              </p>
            </div>

            <div className="rounded-lg border border-line bg-white px-4 py-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                {dict.contactPage.email}
              </p>
              <a
                href={`mailto:${dict.company.email}`}
                className="mt-1.5 inline-block text-[14px] font-semibold tracking-tight text-brand transition hover:text-brand-hover"
              >
                {dict.company.email}
              </a>
              <p className="mt-3 border-t border-line/80 pt-3 text-[12px] leading-5 text-muted">
                {dict.contactPage.description}
              </p>
            </div>

            <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
              {[
                dict.contactPage.registrationOffice,
                dict.contactPage.apFactoryOffice,
                dict.contactPage.koreaOffice,
              ].map((label) => (
                <li
                  key={label}
                  className="px-4 py-2.5 text-[12px] font-medium tracking-tight text-ink-soft"
                >
                  {label}
                </li>
              ))}
            </ul>
          </aside>

          <form
            onSubmit={onSubmit}
            className="rise-delay rounded-xl border border-line bg-white p-5 md:p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={dict.contactPage.name} required>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={fieldClass}
                />
              </Field>
              <Field label={dict.contactPage.company}>
                <input
                  name="company"
                  autoComplete="organization"
                  className={fieldClass}
                />
              </Field>
              <Field label={dict.contactPage.email} required>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                />
              </Field>
              <Field label={dict.contactPage.phone}>
                <input name="phone" autoComplete="tel" className={fieldClass} />
              </Field>
            </div>

            <div className="mt-4">
              <Field label={dict.contactPage.message} required>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className={`${fieldClass} resize-y`}
                />
              </Field>
            </div>

            {error ? (
              <p className="mt-3 rounded bg-accent/10 px-3 py-2 text-[12px] text-accent">
                {error}
              </p>
            ) : null}
            {status === "done" ? (
              <p className="mt-3 rounded bg-brand/10 px-3 py-2 text-[12px] font-medium text-brand">
                {dict.contactPage.success}
              </p>
            ) : null}

            <div className="mt-5">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-10 items-center justify-center rounded bg-brand px-5 text-[13px] font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60"
              >
                {status === "loading"
                  ? dict.contactPage.submitting
                  : dict.contactPage.submit}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="relative border-t border-line bg-surface px-5 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              Offices
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink md:text-[1.85rem]">
              {dict.footer.contact}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <OfficeCard
              title={dict.contactPage.registrationOffice}
              address={dict.company.address}
              mapSrc={REGISTRATION_OFFICE_MAP}
            />
            <OfficeCard
              title={dict.contactPage.apFactoryOffice}
              address={dict.company.apAddress}
              mapSrc={AP_FACTORY_OFFICE_MAP}
            />
            <OfficeCard
              title={dict.contactPage.koreaOffice}
              address={dict.company.koreaAddress}
              note={dict.company.koreaBizInfo}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

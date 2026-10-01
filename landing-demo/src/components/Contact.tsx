"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Section } from "./Section";

type Status = "idle" | "sending" | "sent" | "demo" | "error";

const messages: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent: "Thanks! We'll get back to you within one business day.",
  demo: "Demo mode: no endpoint configured, so nothing was sent. Set NEXT_PUBLIC_FORM_ENDPOINT to go live.",
  error: "Sorry, something went wrong. Please email us directly instead.",
};

const inputClass =
  "mt-2 block w-full rounded-xl border border-bean/15 bg-white px-4 py-3 text-bean placeholder:text-roast/50 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot filled: silently drop bots

    if (!site.formEndpoint) {
      setStatus("demo");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus("error");
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Order, wholesale, or just say hi"
      intro="Tell us how you brew and we'll recommend a coffee. We reply within one business day."
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-5">
        <aside className="rounded-3xl bg-bean p-8 text-cream md:col-span-2">
          <h3 className="font-serif text-2xl font-semibold">Visit the roastery</h3>
          <p className="mt-3 text-cream/70">Tastings every Saturday morning, 8:00 to 11:00.</p>
          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="text-cream/60">Email</dt>
              <dd><a href={`mailto:${site.email}`} className="font-semibold hover:text-amber-300">{site.email}</a></dd>
            </div>
            <div>
              <dt className="text-cream/60">Phone / Zalo</dt>
              <dd className="font-semibold">{site.phone}</dd>
            </div>
            <div>
              <dt className="text-cream/60">Address</dt>
              <dd className="font-semibold">{site.address}</dd>
            </div>
          </dl>
        </aside>

        <form onSubmit={onSubmit} className="space-y-5 md:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Name
              <input name="name" required autoComplete="name" className={inputClass} placeholder="Nguyễn Văn A" />
            </label>
            <label className="block text-sm font-medium">
              Email
              <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" />
            </label>
          </div>
          <label className="block text-sm font-medium">
            I&apos;m interested in
            <select name="topic" className={inputClass} defaultValue="order">
              <option value="order">Ordering coffee</option>
              <option value="subscription">A subscription</option>
              <option value="wholesale">Wholesale for my café / office</option>
              <option value="other">Something else</option>
            </select>
          </label>
          <label className="block text-sm font-medium">
            Message
            <textarea name="message" required rows={5} className={inputClass} placeholder="How do you brew? Phin, espresso, pour-over..." />
          </label>
          <label className="hidden" aria-hidden="true">
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-clay px-8 py-4 font-semibold text-white shadow-lg shadow-clay/25 transition hover:bg-orange-800 disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          <p role="status" aria-live="polite" className={`text-sm ${status === "error" ? "text-red-700" : "text-roast"}`}>
            {status !== "idle" && status !== "sending" ? messages[status] : ""}
          </p>
        </form>
      </div>
    </Section>
  );
}

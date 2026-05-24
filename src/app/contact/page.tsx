"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  honeypot: z.string().max(0, ""),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, subject: data.subject, message: data.message }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Failed to send message" })) as { detail: string };
        setServerError(err.detail);
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-lg">
          <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(28px,5vw,40px)", letterSpacing: "-0.02em" }}>
            Contact Us
          </h1>
          <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
            Have a question, feedback, or partnership inquiry? Fill in the form and we'll get back to you within 24 hours.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-8 text-center">
              <CheckCircle className="h-10 w-10 text-[#10B981]" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Message sent!</h2>
              <p className="text-sm text-[var(--text-secondary)]">Thanks for reaching out. We'll reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot */}
              <div className="hidden">
                <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Name</label>
                <Input {...register("name")} placeholder="Your name" error={errors.name?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Email</label>
                <Input {...register("email")} type="email" placeholder="you@example.com" error={errors.email?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Subject</label>
                <Input {...register("subject")} placeholder="What is this about?" error={errors.subject?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Your message..."
                  className="flex w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] resize-none"
                />
                {errors.message && <p className="mt-1 text-xs text-[#EF4444]">{errors.message.message}</p>}
              </div>

              {serverError && (
                <p className="text-sm text-[#EF4444] rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-3">{serverError}</p>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full" loading={isSubmitting}>
                Send Message
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

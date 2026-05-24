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
import { API_BASE } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  infringing_url: z.string().url("Valid URL required"),
  original_url: z.string().url("Valid URL required"),
  statement: z.string().min(50, "Statement must be at least 50 characters"),
  signature: z.string().min(2, "Electronic signature required"),
});

type FormData = z.infer<typeof schema>;

export default function DMCAPage() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      const res = await fetch(`${API_BASE}/api/dmca`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Submission failed" })) as { detail: string; confirmation_id?: string };
        setServerError(err.detail);
        return;
      }
      const result = await res.json() as { confirmation_id: string };
      setConfirmationId(result.confirmation_id ?? "");
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  return (
    <>
      <Header />
      <main className="section-pad">
        <div className="container-max max-w-3xl">
          <h1 className="font-extrabold text-[var(--text-primary)] mb-3" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-0.02em" }}>
            DMCA Takedown Request
          </h1>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
            If you believe that content accessible via Cliplane infringes your copyright, complete the form below. We process valid DMCA notices within 48 hours in compliance with the Digital Millennium Copyright Act.
          </p>
          <div className="rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-4 mb-8">
            <p className="text-xs text-[#F59E0B]">
              <strong>Warning:</strong> Submitting a false DMCA notice may subject you to liability under 17 U.S.C. §512(f), including costs and attorney's fees.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-8 text-center">
              <CheckCircle className="h-10 w-10 text-[#10B981]" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Notice Received</h2>
              {confirmationId && <p className="text-xs text-[var(--text-tertiary)]">Confirmation ID: <code className="font-mono">{confirmationId}</code></p>}
              <p className="text-sm text-[var(--text-secondary)]">We will review your notice within 48 hours and send a response to the email address you provided.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Your Full Name *</label>
                  <Input {...register("name")} error={errors.name?.message} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Email Address *</label>
                  <Input {...register("email")} type="email" error={errors.email?.message} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">URL of Infringing Content *</label>
                <Input {...register("infringing_url")} placeholder="https://..." error={errors.infringing_url?.message} />
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">The URL on Cliplane or accessed via Cliplane that you believe infringes your copyright.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">URL of Original Copyrighted Work *</label>
                <Input {...register("original_url")} placeholder="https://..." error={errors.original_url?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Statement *</label>
                <textarea
                  {...register("statement")}
                  rows={5}
                  placeholder="I declare under penalty of perjury that I am the owner (or authorised agent) of the exclusive rights being infringed. The above-described content is not authorised by the copyright owner or by law..."
                  className="flex w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] resize-none"
                />
                {errors.statement && <p className="mt-1 text-xs text-[#EF4444]">{errors.statement.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Electronic Signature *</label>
                <Input {...register("signature")} placeholder="Type your full name as signature" error={errors.signature?.message} />
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">By typing your name, you certify the above statements are accurate under penalty of perjury.</p>
              </div>

              {serverError && <p className="text-sm text-[#EF4444] rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-3">{serverError}</p>}

              <Button type="submit" variant="primary" size="lg" className="w-full" loading={isSubmitting}>
                Submit DMCA Notice
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

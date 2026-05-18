"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data: { ok?: boolean; downloadUrl?: string; error?: string } =
        await res.json();

      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("success");
      if (data.downloadUrl) window.location.href = data.downloadUrl;
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section className="bg-navy py-20 text-center text-white" id="download">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="mb-3 text-3xl text-white">Get the free plugin</h2>
        <p className="mb-9 font-sans text-base text-[#b0bcd4]">
          Enter your email and we&rsquo;ll send the download link straight to
          your inbox.
        </p>

        {status === "success" ? (
          <p className="mb-3 font-sans text-base text-emerald-400">
            Check your inbox &mdash; the download link is on its way.
          </p>
        ) : (
          <form
            className="mx-auto mb-3 flex max-w-[480px] flex-wrap justify-center gap-2.5"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@lawfirm.com"
              required
              autoComplete="email"
              className="min-w-[260px] flex-1 border-[#3a4e74] bg-[#1a2d52] text-white placeholder:text-[#6b7ea8] focus-visible:ring-primary"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="whitespace-nowrap"
            >
              {status === "loading" ? "Sending…" : "Download free →"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mb-2 font-sans text-sm text-red-400" role="alert">
            {errorMsg}
          </p>
        )}

        <p className="mt-3 font-sans text-xs text-[#6b7ea8]">
          No spam. One email with the download link, then occasional updates
          from Protomated. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

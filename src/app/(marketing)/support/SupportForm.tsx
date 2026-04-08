"use client";

import { useState, type FormEvent } from "react";
import { LifeBuoy } from "lucide-react";

const PRIORITIES = ["Low", "Medium", "High", "Critical"] as const;
type Priority = (typeof PRIORITIES)[number];

export default function SupportForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          priority,
          description,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit ticket");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setSubject("");
      setPriority("Medium");
      setDescription("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Name <span className="text-amber">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border text-foreground placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email <span className="text-amber">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border text-foreground placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Subject <span className="text-amber">*</span>
        </label>
        <input
          type="text"
          id="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief summary of the issue"
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border text-foreground placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Priority <span className="text-amber">*</span>
        </label>
        <select
          id="priority"
          required
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-colors"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Description <span className="text-amber">*</span>
        </label>
        <textarea
          id="description"
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what's happening, what you expected, and any relevant context..."
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border text-foreground placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber/50 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 bg-amber text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          "Submitting..."
        ) : status === "sent" ? (
          "Ticket Submitted!"
        ) : (
          <>
            Submit Ticket
            <LifeBuoy className="w-4 h-4" />
          </>
        )}
      </button>

      {status === "sent" && (
        <p className="text-center text-sm text-sage">
          Thanks — your ticket is in. We&apos;ll be in touch shortly.
        </p>
      )}

      {status === "error" && errorMessage && (
        <p className="text-center text-sm text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}

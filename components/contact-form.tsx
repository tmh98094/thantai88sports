"use client";

import { useState, type FormEvent } from "react";

type FormState = { kind: "idle" | "loading" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "loading", message: "Đang gửi..." });
    const form = new FormData(event.currentTarget);
    const payload = { name: form.get("name"), email: form.get("email"), message: form.get("message"), consent: form.get("consent") === "on", website: form.get("website") };

    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Chưa thể gửi lời nhắn.");
      setState({ kind: "success", message: result.message ?? "Đã gửi lời nhắn." });
      event.currentTarget.reset();
    } catch (error) {
      setState({ kind: "error", message: error instanceof Error ? error.message : "Có lỗi xảy ra." });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Gửi lời nhắn</h2>
      <div className="form-row"><label>Họ và tên<input autoComplete="name" maxLength={80} name="name" required /></label><label>Email<input autoComplete="email" maxLength={160} name="email" required type="email" /></label></div>
      <label>Nội dung<textarea maxLength={2000} minLength={10} name="message" required rows={7} /></label>
      <label className="honeypot" aria-hidden="true">Website<input autoComplete="off" name="website" tabIndex={-1} /></label>
      <label className="consent-check"><input name="consent" required type="checkbox" /><span>Tôi đồng ý để Thantai88sport xử lý thông tin nhằm phản hồi yêu cầu này.</span></label>
      <button className="button button-primary" disabled={state.kind === "loading"} type="submit">{state.kind === "loading" ? "Đang gửi..." : "Gửi lời nhắn"}</button>
      {state.kind !== "idle" && state.kind !== "loading" ? <p aria-live="polite" className={`form-status form-status-${state.kind}`}>{state.message}</p> : null}
    </form>
  );
}

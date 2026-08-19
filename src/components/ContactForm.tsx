import { useState, type SyntheticEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("bot-field")) {
      return;
    }

    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-message success">
        Thanks — your message has been sent. We'll get back to you shortly.
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="honeypot">
        <label>
          Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      {status === "error" && (
        <p className="form-message error">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

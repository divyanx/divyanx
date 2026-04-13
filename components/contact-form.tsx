"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/data/site";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues) {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please add your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please add your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please use a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please add a short message.";
  } else if (values.message.trim().length < 20) {
    errors.message = "A little more detail would help. Aim for 20 characters or more.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const helperText = useMemo(() => {
    if (status === "submitted") {
      return "Thanks for reaching out — I'll get back to you soon.";
    }

    return `You can also write directly to ${siteConfig.email}.`;
  }, [status]);

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitted");
    setValues(initialValues);
    setErrors({});
  }

  return (
    <form className="contact-form surface-card" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__grid">
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <small id="name-error" className="field__error">
              {errors.name}
            </small>
          ) : null}
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <small id="email-error" className="field__error">
              {errors.email}
            </small>
          ) : null}
        </label>
      </div>

      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell me a little about what you're building or what you'd like to discuss."
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <small id="message-error" className="field__error">
            {errors.message}
          </small>
        ) : null}
      </label>

      <div className="contact-form__footer">
        <p className={`contact-form__helper${status === "submitted" ? " is-success" : ""}`}>
          {helperText}
        </p>
        <button type="submit" className="contact-form__submit">
          <span className="contact-form__submit-kicker">Ready when you are</span>
          <strong>Send message</strong>
        </button>
      </div>
    </form>
  );
}

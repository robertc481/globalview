"use server";

import { Resend } from "resend";
import { z } from "zod";
import type { ContactFormState } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  category: z.string().min(1, "Please select a project category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  if (formData.get("_honey")) {
    return { success: true, message: "Message sent successfully." };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    category: formData.get("category"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "_form");
      if (!errors[field]) errors[field] = issue.message;
    }
    return { success: false, errors };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Global View <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "hello@globalview.tech",
      subject: `New Inquiry: ${result.data.category} — ${result.data.name}`,
      replyTo: result.data.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${result.data.name}</p>
        <p><strong>Email:</strong> ${result.data.email}</p>
        <p><strong>Category:</strong> ${result.data.category}</p>
        <hr />
        <p>${result.data.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return { success: true, message: "Message sent successfully." };
  } catch {
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}

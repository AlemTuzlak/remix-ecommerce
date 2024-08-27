import { Resend } from "resend";
import { getServerEnv } from "../env.server";
import type { ReactNode } from "react";

const { RESEND_API_KEY, RESEND_AUDIENCE_ID } = getServerEnv();
const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async ({
  email,
  subject,
  emailTemplate,
}: {
  email: string;
  subject: string;
  emailTemplate: ReactNode;
}) => {
  const response = await resend.emails.send({
    from: "noreply@forge42.dev",
    to: email,
    subject,
    react: emailTemplate,
  });
  return { error: response.error?.message };
};

export const addEmailToNewsletter = async (email: string) => {
  const response = await resend.contacts.create({
    email,
    audienceId: RESEND_AUDIENCE_ID,
  });
  return response;
};

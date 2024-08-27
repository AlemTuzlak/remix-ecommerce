import { createHash } from "node:crypto";
import { prisma as db } from "../db";
import { addEmailToNewsletter, sendEmail } from "../mailing/resend";
import { NewsletterEmail } from "../mailing/newsletter";
import React from "react";

const upsertNewsletterEntry = async (email: string) => {
  const token = createHash("sha256").update(email).digest("hex");
  const newsletter = await db.newsletter.upsert({
    where: {
      email,
    },
    create: {
      email,
      token,
    },
    update: {
      token,
    },
  });
  return newsletter;
};

const getNewsletterEntry = (token: string) =>
  db.newsletter.findUnique({
    where: { token },
  });

const deleteNewsletterEntry = (token: string) =>
  db.newsletter.delete({
    where: { token },
  });

export const sendConfirmationEmail = async (email: string) => {
  const newsletter = await upsertNewsletterEntry(email);
  const emailTemplate = (
    <NewsletterEmail
      token={newsletter.token}
      domain={
        process.env.NODE_ENV === "production"
          ? "https://forge42.dev"
          : "http://localhost:3000"
      }
    />
  );
  const { error } = await sendEmail({
    email,
    subject: "Newsletter signup",
    emailTemplate,
  });
  if (error) {
    return { error, token: null };
  }
  return { token: newsletter.token, error: null };
};

export const confirmNewsletter = async (token: string) => {
  const newsletter = await getNewsletterEntry(token);
  if (!newsletter) {
    return {
      error: "Invalid token",
    };
  }
  const { email } = newsletter;
  const { error } = await addEmailToNewsletter(email);
  if (error) {
    return { error: error.message };
  }
  await deleteNewsletterEntry(token);
  return { error: null };
};

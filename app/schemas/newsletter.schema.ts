import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email().min(1),
});

export type NewsletterInfo = z.infer<typeof newsletterSchema>;

import { z } from "zod";

const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "fakeinbox.com",
];

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (email) => !DISPOSABLE_DOMAINS.some((d) => email.toLowerCase().endsWith(`@${d}`)),
      "Disposable email domains are not allowed"
    ),
  role: z.string().min(1, "Please select a role"),
  experience: z
    .string()
    .min(1, "Experience is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 50, {
      message: "Experience must be a number between 0 and 50",
    }),
  interestNote: z
    .string()
    .min(10, "Please write at least 10 characters")
    .max(2000, "Note too long (max 2000 chars)"),
  portfolioUrl: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal("")),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;

export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"']/g, "")
    .trim();
}

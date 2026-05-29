export interface ApplicationFormData {
  fullName: string;
  email: string;
  role: string;
  experience: string;
  interestNote: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  honeypot?: string;
}

export interface ApplicationPayload extends ApplicationFormData {
  timestamp: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export type FormState = "idle" | "loading" | "success" | "error";

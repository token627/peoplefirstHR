import { google } from "googleapis";
import { ApplicationFormData } from "@/types/application";

function getGoogleAuth() {
  const credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  };

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendValidApplication(
  data: ApplicationFormData & { timestamp: string; aiSummary?: string }
) {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

  const values = [
    [
      data.timestamp,
      data.fullName,
      data.email,
      data.role,
      data.experience,
      data.interestNote,
      data.portfolioUrl || "",
      data.linkedinUrl || "",
      data.aiSummary || "",
      "valid",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Valid Applications!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

export async function appendSpamApplication(
  data: ApplicationFormData & { timestamp: string; spamReason: string }
) {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

  const values = [
    [
      data.timestamp,
      data.fullName,
      data.email,
      data.spamReason,
      JSON.stringify(data),
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Spam Applications!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

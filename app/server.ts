"use server";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

async function getDoc(): Promise<GoogleSpreadsheet> {
  const { SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } =
    process.env;

  if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY)
    throw new Error("Missing env vars");

  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

export async function getSheetTitles() {
  const doc = await getDoc();
  return Object.keys(doc.sheetsByTitle);
}

export async function saveLogToSheet(
  _prevState: string,
  formData: FormData,
): Promise<string> {
  "use server";
  const { sheet, log } = Object.fromEntries(formData.entries());

  if (!log || typeof log !== "string") return "Invalid log";
  if (!sheet || typeof sheet !== "string") return "Invalid sheet name";

  const timestamp = new Date().toISOString();

  try {
    const doc = await getDoc();
    await doc.sheetsByTitle[sheet].addRow({ log, timestamp });
  } catch (error: any) {
    console.error(error);
    return `Error saving to spreadsheet - ${error.message}`;
  }

  return `Added ${timestamp}: ${log} to ${sheet}`;
}

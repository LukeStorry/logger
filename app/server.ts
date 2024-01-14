"use server";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const {
  SPREADSHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  PASSKEY,
} = process.env;

async function getDoc(): Promise<GoogleSpreadsheet> {
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

export async function getOutputUrl() {
  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;
}

export async function checkPasskey(passkey: string) {
  if (passkey === PASSKEY) return true;

  console.log("Invalid passkey", { passkey, PASSKEY });
  return false;
}

export async function getCategories() {
  const doc = await getDoc();
  return Object.keys(doc.sheetsByTitle);
}

export async function saveLogToSheet(
  _prevState: string,
  formData: FormData,
): Promise<string> {
  "use server";
  const {
    log,
    date,
    category = "default",
  } = Object.fromEntries(formData.entries());

  if (!log || typeof log !== "string") return "Invalid log";
  if (category && typeof category !== "string") return "Invalid category";
  if (date && typeof date !== "string") return "Invalid date";

  const timestamp = new Date(date || Date.now()).toISOString();

  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[category];
    if (!sheet) throw new Error(`No sheet found for category "${category}"`);
    await sheet.addRow({ log, timestamp });
  } catch (error: any) {
    console.error(error);
    return `Error saving to spreadsheet - ${error.message}`;
  }

  return `Added "${log}" to ${category} category at ${timestamp}`;
}

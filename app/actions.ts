"use server";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

async function getDoc(): Promise<GoogleSpreadsheet> {
  const { SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } =
    process.env;

  if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY)
    throw new Error("Missing env vars");

  console.log({ GOOGLE_SERVICE_ACCOUNT_EMAIL });

  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

export async function saveLog(_: any, formData: FormData): Promise<string> {
  const log = formData.get("log") as string;
  if (!log) return "Error - empty input!";

  const timestamp = new Date().toISOString();
  const newRow = { log, timestamp };
  console.log("New Row: ", newRow);

  try {
    const doc = await getDoc();
    await doc.sheetsByTitle["personal"].addRow(newRow);
    return `Added ${timestamp}: ${log}`;
  } catch (error: any) {
    console.error(error);
    return `Error saving to spreadsheet - ${error.message}`;
  }
}

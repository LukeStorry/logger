import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

async function getDoc(): Promise<GoogleSpreadsheet> {
  "use server";

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

async function save(formData: FormData) {
  "use server";

  const log = formData.get("log") as string;
  if (!log) return { message: "Empty input" };

  const timestamp = new Date().toISOString();
  const newRow = { log, timestamp };
  console.log("New Row: ", newRow);

  try {
    const doc = await getDoc();
    await doc.sheetsByTitle["personal"].addRow(newRow);
    return { message: `Added ${timestamp}: ${log}` };
  } catch (error: any) {
    console.error(error);
    return { message: `Error saving to spreadsheet - ${error.message})` };
  }
}

function Form() {
  return (
    <form
      action={save}
      className="bg-slate-300 rounded p-10 border w-10/12 border-white mb-24 flex flex-col gap-10  items-center "
    >
      <input
        // required
        type="text"
        name="log"
        className="rounded w-full h-8 p-2"
      />
      <button
        type="submit"
        className="bg-blue-800 text-white rounded max-w-20 p-3"
      >
        Save
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-800">
      <Form />
    </main>
  );
}

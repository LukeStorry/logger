"use server";
import { getSheetTitles } from "./server";
import { Form } from "./client";

export default async function Page({ searchParams }: { searchParams: any }) {
  const searchKeys = Object.keys(searchParams);
  const allowed =
    searchKeys.length == 1 && searchKeys[0] === process.env.PASSKEY;

  return (
    <main className="min-h-screen bg-slate-800 p-1 py-24 md:px-24">
      <div className="mx-auto items-center rounded border border-white bg-cyan-500 p-1 py-10 md:px-10">
        {allowed ? (
          <Form sheetTitles={await getSheetTitles()} />
        ) : (
          "Invalid passkey"
        )}
      </div>
    </main>
  );
}

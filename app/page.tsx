"use server";
import { getSheetTitles } from "./actions";
import { Form } from "./Form";

export default async function Page() {
  return (
    <main className="min-h-screen bg-slate-800 p-1 py-24 md:px-24">
      <div className="mx-auto h-80 items-center rounded border border-white bg-cyan-500 p-1 py-10 md:px-10">
        <Form sheetTitles={await getSheetTitles()} />
      </div>
    </main>
  );
}

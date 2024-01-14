"use server";
import { checkPasskey, getCategories, getOutputUrl } from "./server";
import { Form } from "./client";

export default async function Page({ searchParams }: { searchParams: any }) {
  const authorised = await checkPasskey(searchParams);
  const categories = authorised ? await getCategories() : ["default"];

  return (
    <main className="min-h-screen bg-slate-800 p-1 py-24 md:px-24">
      <div className="mx-auto items-center rounded border border-white bg-cyan-500 p-1 py-10 md:px-10">
        <Form categories={categories} showSettings={authorised} />
      </div>

      <a href={await getOutputUrl()} target="_blank">
        -
      </a>
    </main>
  );
}

"use client";
import { useFormState, useFormStatus } from "react-dom";
import { saveLogToSheet } from "./server";

function Settings({ categories }: { categories: string[] }) {
  const options = categories.map((o) => <option key={o}>{o}</option>);
  return (
    <>
      <input type="datetime-local" name="date" className=" mr-4 rounded p-2 " />
      <select name="category" className="rounded p-2">
        {options}
      </select>
    </>
  );
}

export function Form({
  categories,
  showSettings,
}: {
  categories: string[];
  showSettings: boolean;
}) {
  const [result, action] = useFormState(saveLogToSheet, "");

  return (
    <form action={action}>
      <textarea
        required
        name="log"
        className="mb-10 min-h-24 w-full rounded p-2 "
      />

      {showSettings && <Settings categories={categories}></Settings>}

      <SubmitButton />
      {result && (
        <div className="text-center text-white lg:inline">{result}</div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "m-8 w-20 rounded p-3 text-white" +
        (pending ? " bg-cyan-600 " : " bg-cyan-800 ")
      }
    >
      {pending ? "Saving" : "Save"}
    </button>
  );
}

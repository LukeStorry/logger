"use client";
import { useFormState, useFormStatus } from "react-dom";
import { saveLogToSheet } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "ml-48 w-20 rounded p-3 text-white " +
        (pending ? " bg-cyan-600 " : " bg-cyan-800 ")
      }
    >
      {pending ? "Saving" : "Save"}
    </button>
  );
}

export function Form({ sheetTitles }: { sheetTitles: string[] }) {
  const [result, action] = useFormState(saveLogToSheet, "");

  return (
    <form action={action}>
      <input
        required
        type="text"
        name="log"
        className="mb-10 h-8 w-full rounded p-2 "
      />

      <select name="sheet" className="rounded p-2">
        {sheetTitles.map((sheet) => (
          <option key={sheet}>{sheet}</option>
        ))}
      </select>

      <SubmitButton />
      {result && <div className="mt-10 text-center text-white">{result}</div>}
    </form>
  );
}

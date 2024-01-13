"use client";
import { useFormState, useFormStatus } from "react-dom";
import { saveLogToSheet } from "./server";

export function Form({ sheetTitles }: { sheetTitles: string[] }) {
  const [result, action] = useFormState(saveLogToSheet, "");

  return (
    <form action={action}>
      <textarea
        required
        name="log"
        className="mb-10 min-h-24 w-full rounded p-2 "
      />
      <input type="datetime-local" name="date" className=" mr-4 rounded p-2 " />

      <select name="sheet" className=" rounded p-2">
        {sheetTitles.map((sheet) => (
          <option key={sheet}>{sheet}</option>
        ))}
      </select>

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

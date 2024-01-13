"use server";

import { useFormState, useFormStatus } from "react-dom";
import { saveLog } from "./actions";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "text-white rounded w-20 p-3  " +
        (pending ? " bg-blue-600 " : " bg-blue-800 ")
      }
    >
      {pending ? "Saving" : "Save"}
    </button>
  );
}

export default function Home() {
  const [message, formAction] = useFormState(saveLog, null);

  return (
    <main className="min-h-screen bg-blue-800 p-24">
      <div className="bg-slate-300 rounded p-10 border w-10/12 border-white items-center mx-auto h-96">
        <form action={formAction}>
          <input
            required
            type="text"
            name="log"
            className="rounded w-full h-8 p-2"
          />
          <SubmitButton />
          {message && (
            <div className="text-white text-center mt-10">{message}</div>
          )}
        </form>{" "}
      </div>
    </main>
  );
}

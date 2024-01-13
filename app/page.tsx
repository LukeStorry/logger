"use client";
import { useFormState, useFormStatus } from "react-dom";
import { saveLog } from "./actions";

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

export default function Form() {
  const [message, formAction] = useFormState(saveLog, "");

  return (
    <form
      action={formAction}
      className="mx-auto h-80 items-center rounded border border-white bg-cyan-500 p-1 py-10 md:px-10"
    >
      <input
        required
        type="text"
        name="log"
        className="mb-10 h-8 w-full rounded p-2 "
      />
      <SubmitButton />
      {message && <div className="mt-10 text-center text-white">{message}</div>}
    </form>
  );
}

async function save(formData: FormData) {
  "use server";

  const log = formData.get("log");

  console.log({ log });
  if (!log) return;
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-800">
      <form
        action={save}
        method="POST"
        className="bg-slate-300 rounded p-10 border w-10/12 border-white mb-24 flex flex-col gap-10  items-center "
      >
        <input type="text" name="log" className="rounded w-full h-8 p-2" />
        <button
          type="submit"
          className="bg-blue-800 text-white rounded max-w-20 p-3"
        >
          Save
        </button>
      </form>
    </main>
  );
}

import Form from "./form";
// import Link from "next/link";

export default function Login() {
  // update link for signup when page is done
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-darker-blue dark:bg-black">
      <main className="flex h-[70%] w-[55%] flex-col items-center justify-center rounded-lg bg-white dark:bg-darker-blue">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold">Login</h1>
          <h2 className="mt-1 text-base">Get started for free</h2>
          <Form />
        </div>
      </main>
    </div>
  );
}

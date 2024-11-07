import Form from "./form";

export default function Login() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[70%] w-[55%] flex-col items-center justify-center rounded-lg bg-light-background dark:bg-dark-secondary">
        <div className="w-1/2">
          <h1>Login</h1>
          <h2 className="mt-2">Get started for free</h2>
          <Form />
        </div>
      </div>
    </main>
  );
}

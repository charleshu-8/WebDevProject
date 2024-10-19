import Form from "./form";

// Page for password recovery
export default function PasswordRecovery() {
  // Change href to point to actual signup page once implemented
  return (
    <div>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-white">
        <h1 className="mb-10 text-6xl font-bold">Uh Oh!</h1>
        <p className="mt-10 w-2/3 text-pretty text-center">
          Enter the email associated with your account and we&apos;ll help you
          reset your password.
        </p>
        <Form />
        <p>
          Don&apos;t have an account?{" "}
          <a
            href="/auth/sign-up"
            className="text-blue-600 underline hover:no-underline dark:text-blue-500"
          >
            Sign up.
          </a>
        </p>
      </main>
    </div>
  );
}

import Form from "./form";

// Page for password recovery
export default function PasswordRecovery() {
  // Change href to point to actual signup page once implemented
  return (
    <div>
      <main className="h-screen w-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl mb-10 font-bold">Uh Oh!</h1>
        <p className="mt-10 w-2/3 text-center text-pretty">
          Enter the email associated with your account and we'll help you reset
          your password.
        </p>
        <Form />
        <p>
          Don't have an account?{" "}
          <a
            href="PLACEHOLDER"
            className="text-blue-600 underline dark:text-blue-500 hover:no-underline"
          >
            Sign up.
          </a>
        </p>
      </main>
    </div>
  );
}

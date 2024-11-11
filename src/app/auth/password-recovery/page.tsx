import Form from "./form";

export default function PasswordRecovery() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-extra-light-gray dark:bg-extra-dark-gray">
      <div className="flex h-[55%] w-[45%] flex-col items-center justify-center rounded-lg bg-light-background dark:bg-extra-gray">
        <h1 className="mb-5">Uh Oh!</h1>
        <h2 className="mt-10 w-2/3 text-pretty text-center">
          Enter the email associated with your account and we&apos;ll help you
          reset your password.
        </h2>
        <Form />
        <p>
          Don&apos;t have an account?{" "}
          <a href="/auth/sign-up" className="hypertext-styling">
            Sign up.
          </a>
        </p>
      </div>
    </main>
  );
}

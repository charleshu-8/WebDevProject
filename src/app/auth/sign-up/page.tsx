import Form from "./form";

export default function SignUp() {
  return (
    // Background Screen
    <div className="h-full w-full bg-darker-blue dark:bg-black overscroll-none">
      <main className="h-full w-full flex flex-col mb-10 mt-6 bg-darker-blue dark:bg-black overscroll-none">
        <h1 className="text-6xl mt-6 mb-8 text-white dark:text-dim-white font-thin text-center">
          Create Your Account
        </h1>
        <div className="flex flex-col items-center">
          {/*Main White Form Rectangle*/}
          <div className="mb-6 bg-white dark:bg-darker-blue rounded-xl p-6 w-4/5 md:w-2/3 lg:w-3/5">
            <Form />
            <p className="text-center">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-blue-600 underline dark:text-blue-500 hover:no-underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

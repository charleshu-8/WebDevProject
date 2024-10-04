import Form from "./form";

export default function SignUp() {
  return (
    <div className="h-full w-screen bg-darker-blue overscroll-none">
      <main className="h-full w-screen flex flex-col bg-darker-blue overscroll-none">
        <h1 className="text-6xl mt-6 mb-6 text-white font-thin text-center">
          Create Your Account
        </h1>
        <div className="flex flex-col items-center">
          {/*Main White Form Rectangle*/}
          <div className="bg-white rounded-xl p-6 w-4/5 md:w-2/3 lg:w-3/5">
            <Form />
            <p className="text-center">
              Already have an account?{" "}
              <a
                href="PLACEHOLDER"
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

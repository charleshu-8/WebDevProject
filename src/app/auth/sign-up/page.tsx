import PasswordForm from "./form_password";
import UsernameForm from "./form_username";

export default function SignUp() {
  return (
    <div>
      <main className="h-screen w-screen flex flex-col bg-darker-blue">
        <h1 className="text-6xl mt-6 mb-6 text-white font-thin text-center">
          Create Your Account
        </h1>
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-xl p-6 w-4/5 md:w-2/3 lg:w-3/5">
            <p className="text-black font-bold mb-5">Register:</p>
            <div className="flex flex-row justify-center space-x-4">
              <div className="flex-1 w-full justify-center">
                <UsernameForm />
              </div>
              <div className="flex-1 w-full justify-center">
                <PasswordForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

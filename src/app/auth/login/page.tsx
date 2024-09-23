import Form from "./form";
import Link from "next/link";
export default function Login() {

  //update link for signup when page is done
  return (
    <div className="bg-darker-blue h-screen w-screen flex items-center justify-center">
      <main className="bg-white h-[70%] w-[55%] flex flex-col items-center justify-center rounded-lg">
          <div className="w-1/2">
            <h1 className="text-5xl mt-8 font-bold">Login</h1>
            <h2 className="text-base" >Get started for free</h2>
            <Form />
          </div>
      </main>
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#FAFCFF]  dark:bg-gradient-to-r from-[#073269] to-black">
      <main className="text-[#030C17] font-roboto dark:text-[#E8F1FC]">
        <div className="h-[150px]">
          <div className="absolute right-0 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="750" height="150" viewBox="0 0 750 150" fill="none">
              <path d="M882.5 156H0L150.5 0H882.5V156Z" fill="#073269"/>
            </svg>
          </div>
          <div className="absolute top-0 bg-[#C59C34] w-[22px] h-[150px]"></div>
          <div className="absolute top-[47px] left-[47px] text-left">
            <h1 className="text-5xl font-bold">
              Team Slackers
            </h1>
          </div>
          <div className="z-20 absolute top-[66px] right-[200px] font-bold text-[#E8F1FC]">
            <Link href={"auth/sign-up"}>Sign Up</Link>
          </div>
          <div className="z-20 absolute top-[66px] right-[100px] font-bold text-[#E8F1FC]">
            <Link href={"/auth/login"}>Login</Link>
          </div>
        </div>
        <div className="relative ml-[150px] dark:text-[#E8F1FC]">
          <h1 className="text-5xl mt-[200px]">
            Bring Order to Meetings
          </h1>
          <h2 className="mt-[25px] w-1/2 font-">
            A web-based platform that adapts Robert&apos;s Rules of Order for digital use
          </h2>
        </div>
      </main>
    </div>
  );
}

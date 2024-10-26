import Link from "next/link";
import {Button} from "@mui/material";

export default function Home() {
  return (
    <main className="bg-light-background from-light-primary flex h-screen w-screen flex-col to-black dark:bg-gradient-to-r">
      <div className="text-light-text dark:text-dark-text">
        <div className="h-[150px]">
          <div className="absolute right-0 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="750"
              height="150"
              viewBox="0 0 750 150"
              fill="none"
            >
              <path d="M882.5 156H0L150.5 0H882.5V156Z" fill="#073269" />
            </svg>
          </div>
          <div className="bg-light-accent absolute top-0 h-[150px] w-[22px]"></div>
          <div className="absolute left-[47px] top-[47px] text-left">
            <h1 className="text-5xl">Team Slackers</h1>
          </div>
          <div className="text-dark-text absolute right-[200px] top-[66px] z-20 font-bold">
            <Link href={"auth/sign-up"}>Sign Up</Link>
          </div>
          <div className="text-dark-text absolute right-[100px] top-[66px] z-20 font-bold">
            <Link href={"/auth/login"}>Login</Link>
          </div>
        </div>
        <div className="dark:text-dark-text relative ml-[150px]">
          <h1 className="mt-[200px] text-5xl">Bring Order to Meetings</h1>
          <h2 className="mt-[25px] w-1/2">
            A web-based platform that adapts Robert&apos;s Rules of Order for
            digital use
          </h2>
          {/*you can delete this testing chatpage button whenever*/}
          <button className="h-auto w-auto bg-darker-blue text-white">
            <Link href={"/chat"}>Go To Chat Page</Link>
          </button>
        </div>
      </div>
    </main>
  );
}

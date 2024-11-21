"use client";

import Link from "next/link";
import { getMotionDetails } from "./db/motions";
import { getCurrentMotion } from "./db/pocketbase";
import { addNewMessage } from "./db/messages";

export default function Home() {
  async function test() {
    console.log(
      await addNewMessage(
        "this is a test",
        "c8txbfn3j9lchaz",
        "4fc4fjfp7ofwo2p",
        "dummy",
      ),
    );
  }

  return (
    <main className="flex h-screen w-screen flex-col bg-light-background from-light-primary to-black dark:bg-gradient-to-r">
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
          <div className="absolute top-0 h-[150px] w-[22px] bg-light-accent"></div>
          <div className="absolute left-[47px] top-[47px] text-left">
            <h1 className="text-5xl">Team Slackers</h1>
          </div>
          <div className="absolute right-[200px] top-[66px] z-20 font-bold text-dark-text">
            <Link href={"auth/sign-up"}>Sign Up</Link>
          </div>
          <div className="absolute right-[100px] top-[66px] z-20 font-bold text-dark-text">
            <Link href={"/auth/login"}>Login</Link>
          </div>
        </div>
        <div className="relative ml-[150px] dark:text-dark-text">
          <h1 className="mt-[200px] text-5xl">Bring Order to Meetings</h1>
          <h2 className="mt-[25px] w-1/2">
            A web-based platform that adapts Robert&apos;s Rules of Order for
            digital use
          </h2>
          {/*you can delete this testing chatpage button whenever*/}
          <button className="h-auto w-auto bg-light-primary text-white">
            <Link href={"/chat"}>Go To Chat Page</Link>
          </button>
          <button
            className="h-auto w-auto bg-light-primary text-white"
            onClick={test}
          >
            dsfffffffffffffffffffffffffffffffffffffffff{" "}
          </button>
        </div>
      </div>
    </main>
  );
}

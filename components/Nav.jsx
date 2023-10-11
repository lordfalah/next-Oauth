"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

const Nav = () => {
  const [togleDropdown, setTogleDropdown] = useState(false);
  const [providers, setProvider] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const setProv = async () => {
      const response = await getProviders();
      setProvider(response);
    };

    setProv();
  }, []);

  return (
    <nav>
      <div className="flex justify-between mb-16 pt-3 items-center px-4">
        <Link href="/" className="">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
          />
        </Link>

        <div className="hidden sm:flex sm:gap-5">
          {session?.user ? (
            <Fragment>
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" className="outline_btn" onClick={signOut}>
                Sign Out
              </button>
              {session?.user?.image && (
                <Link href="/profile">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                    style={{
                      width: "auto",
                      height: "auto",
                    }}
                  />
                </Link>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <button
                type="button"
                className="px-7 py-2 rounded-full border-2"
                onClick={signIn}
              >
                Sign In
              </button>
              <Image
                src="assets/images/logo.svg"
                alt="logo"
                width={0}
                height={0}
                className="rounded-full w-10 h-10"
              />
            </Fragment>
          )}
        </div>

        <div
          onClick={() => setTogleDropdown((prev) => !prev)}
          className="relative block sm:hidden cursor-pointer"
        >
          {session?.user?.image ? (
            <Image
              src={`${session?.user?.image}`}
              alt={session?.user?.name}
              width={37}
              height={37}
              className="rounded-full"
            />
          ) : (
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={37}
              height={37}
              className="rounded-full"
            />
          )}

          <div
            className={`absolute top-12 bg-white right-10 whitespace-nowrap w-auto p-4 ${
              togleDropdown ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-y-2 items-end">
              <Link
                href="/profile"
                className="text-black/80"
                onClick={() => setTogleDropdown(true)}
              >
                My Profile
              </Link>

              <Link
                href="/create-prompt"
                className="text-black/80"
                onClick={() => setTogleDropdown(true)}
              >
                Create Prompt
              </Link>
            </div>

            <div className="mt-6">
              {session?.user ? (
                <Fragment>
                  <button
                    onClick={signOut}
                    type="button"
                    className="px-14 py-2 rounded-full border-2 bg-black text-white"
                  >
                    Sign Out
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <button
                        type="button"
                        key={provider.name}
                        onClick={() => {
                          signIn(provider.id);
                        }}
                        className="black_btn px-14 py-2 rounded-full border-2 bg-black text-white"
                      >
                        Sign in
                      </button>
                    ))}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

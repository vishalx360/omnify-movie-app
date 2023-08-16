import { AnimatePresence, motion } from "framer-motion";
import { LucideArrowLeft } from "lucide-react";
import { type GetServerSidePropsContext } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Divider from "@/modules/Global/Divider";
import { CredentialSection } from "@/modules/Signin/CredentialSection";

export default function SignInPage() {
  async function handelOauthSignin(provider: string) {
    await signIn(provider);
  }
  return (
    <>
      <Head>
        <title>Taskflow | Sign-in</title>
      </Head>
      <section className="bg-neutral-100 dark:bg-neutral-900">
        <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <motion.div layoutId="header" className="flex items-center  gap-5">
            <Link
              href="/"
              className="flex items-center gap-5 rounded-full border-neutral-400 p-2 transition duration-200 ease-in-out hover:bg-neutral-500/20 "
            >
              <LucideArrowLeft className="text-2xl" />
            </Link>
            <div className="my-10 block text-3xl ">Omnify Movie App</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="w-full rounded-xl bg-white shadow-lg dark:border dark:border-neutral-700 dark:bg-neutral-800 sm:max-w-md md:mt-0 xl:p-0"
          >
            <div className="space-y-6 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-medium leading-tight tracking-tight text-neutral-900 dark:text-white md:text-2xl">
                Sign in to your account
              </h1>

              <AnimatePresence mode="wait">
                <CredentialSection />
              </AnimatePresence>

              <Divider />

              <div className="flex flex-col items-center gap-2 md:flex-row">
                <Button
                  onClick={() => {
                    void handelOauthSignin("github");
                  }}
                  variant="outline"
                  className="text-md flex w-full items-center justify-center gap-4"
                  size="lg"
                  LeftIcon={FaGithub}
                >
                  Continue with Github
                </Button>
              </div>
              <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-black hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  return {
    props: { session },
  };
}

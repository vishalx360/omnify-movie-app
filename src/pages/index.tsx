import { type GetServerSidePropsContext } from "next";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Home({ session }: { session: Session }) {
  return (
    <>
      <Head>
        <title>Omnify Movie App</title>
        <meta
          name="description"
          content="Solution for Full Stack Developer Assignment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {session?.user ? "Taking to dashboard" : "Taking to Signin page"}
      </main>
    </>
  );
}

// make server call to redirect to /signin if not authenticated nextauth
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

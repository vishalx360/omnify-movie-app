import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

function Dashboard() {
  const { data: session } = useSession();


  return (
    <section>
      <nav className="flex gap-5 ">
        {session?.user.email ?? "not loggedin"}
        <Link className="underline" href="/api/auth/signout">
          Log out
        </Link>
      </nav>
      {/* add navbar */}
      <div>Dashboard</div>
      {/* search bar */}
      {/* list of movies */}
    </section>
  );
}

export default Dashboard;

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
  }
  return {
    props: { session },
  };
}

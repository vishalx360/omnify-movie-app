import { api } from "@/utils/api";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

function Dashboard() {
  const { data: session } = useSession();

  const { data: movie } = api.dashboard.getLatest.useQuery();
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

      {movie?.results.map(result => {
        return (
          <div key={result.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}` ?? "#"} className="w-[200px] " />
            <h1>{result.title}</h1>
          </div>
        )
      })}
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

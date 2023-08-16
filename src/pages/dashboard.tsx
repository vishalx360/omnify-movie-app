import DashboardLayout from "@/components/DashboardLayout";
import MovieRow from "@/components/MovieRow";
import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

function Dashboard() {
  return (
    <DashboardLayout>
      <section className=" py-10 container">
        <MovieRow type="NOWPLAYING" />
        <MovieRow type="UPCOMING" />
        <MovieRow type="POPULAR" />
        <MovieRow type="TOPRATED" />
      </section>
    </DashboardLayout>
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

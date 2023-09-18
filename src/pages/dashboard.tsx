import DashboardLayout from "@/components/DashboardLayout";
import DiscoverGrid from "@/components/DiscoverGrid";
import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

function Dashboard() {
  return (
    <DashboardLayout>
      <section className=" container py-10">
        <DiscoverGrid type="NOWPLAYING" />
        <DiscoverGrid type="UPCOMING" />
        <DiscoverGrid type="POPULAR" />
        <DiscoverGrid type="TOPRATED" />
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

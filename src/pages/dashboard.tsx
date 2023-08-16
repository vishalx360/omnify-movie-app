import DashboardLayout from "@/components/DashboardLayout";
import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

function Dashboard() {
  return (
    <DashboardLayout>
      <section>list of movies from tmdb</section>
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

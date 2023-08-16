import DashboardLayout from "@/components/DashboardLayout";
import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

function Favorite() {
  return (
    <DashboardLayout>
      <section>list of movies in favorites</section>
    </DashboardLayout>
  );
}

export default Favorite;

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

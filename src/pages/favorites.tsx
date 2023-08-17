import DashboardLayout from "@/components/DashboardLayout";
import MovieGrid, { MovieRowSkeleton } from "@/components/MovieGrid";
import { api } from "@/utils/api";
import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Error from "next/error";

function Favorite() {
  const { data: movies, error, isLoading } = api.favorite.get.useQuery();
  return (
    <DashboardLayout>
      {error && (
        <Error
          statusCode={error.data?.httpStatus ?? 500}
          title={error.message}
        />
      )}
      <section className="container my-10">
        {isLoading ? (
          <MovieRowSkeleton amount={18} />
        ) : (
          movies && <MovieGrid movies={movies} title="Favorites" />
        )}
      </section>
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

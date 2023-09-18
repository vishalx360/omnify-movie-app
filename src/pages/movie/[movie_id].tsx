import AddToFavBtn from "@/components/AddToFavBtn";
import DashboardLayout from "@/components/DashboardLayout";
import MovieDetail from "@/components/MovieDetail";
import SimilarMovies from "@/components/SimilarMovieRow";
import { api } from "@/utils/api";
import { LucideLoader } from "lucide-react";
import Error from "next/error";
import { useRouter } from "next/router";

function MovieDetailsPage() {
  const router = useRouter();
  const { data: movie, error } = api.movie.getDetails.useQuery(
    {
      movie_id: router.query?.movie_id as string,
    },
    {
      enabled: Boolean(router.query.movie_id),
    }
  );

  if (error) {
    return (
      <Error statusCode={error.data?.httpStatus ?? 500} title={error.message} />
    );
  }
  return (
    <DashboardLayout>
      {movie ? (
        <section className="container my-10">
          <MovieDetail movie={movie}>
            <div className="mt-10 flex items-center ">
              <AddToFavBtn movie={movie} />
            </div>
          </MovieDetail>
          <div className="mt-10">
            <SimilarMovies movie_id={String(movie.id)} />
          </div>
        </section>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin ">
            <LucideLoader />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default MovieDetailsPage;

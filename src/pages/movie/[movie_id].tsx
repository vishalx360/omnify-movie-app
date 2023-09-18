import AddToFavBtn from "@/components/AddToFavBtn";
import BackButton from "@/components/BackButton";
import DashboardLayout from "@/components/DashboardLayout";
import MovieDetail, { MovieDetailSkeleton } from "@/components/MovieDetail";
import { MovieRowSkeleton } from "@/components/MovieGrid";
import SimilarMovies, { SimilarMoviesSkeleton } from "@/components/SimilarMovieRow";
import { api } from "@/utils/api";
import { LucideLoader } from "lucide-react";
import Error from "next/error";
import { useRouter } from "next/router";

function MovieDetailsPage() {
  const router = useRouter();
  const { data: movie, isLoading, error } = api.movie.getDetails.useQuery(
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
      <section className="container my-10">
        <div className="mb-5">
          <BackButton />
        </div>
        {isLoading ? (
          <>
            <MovieDetailSkeleton />
            <div className="mt-10">
              <MovieRowSkeleton amount={10} />
            </div>
          </>
        )
          : (
            <>
              {movie && (
                <>
                  <MovieDetail movie={movie}>
                    <div className="mt-10 flex items-center ">
                      <AddToFavBtn movie={movie} />
                    </div>
                  </MovieDetail>
                  <div className="mt-10">
                    <SimilarMovies movie_id={String(movie.id)} />
                  </div>
                </>
              )}
            </>
          )
        }
      </section>
    </DashboardLayout>
  );
}

export default MovieDetailsPage;

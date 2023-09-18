import AddToFavBtn from "@/components/AddToFavBtn";
import BackButton from "@/components/BackButton";
import DashboardLayout from "@/components/DashboardLayout";
import MovieDetail from "@/components/MovieDetail";
import SimilarMovies from "@/components/SimilarMovieRow";
import {
  getList,
  getMovieDetails,
  getSimilar,
  movieSectionTypes,
} from "@/utils/GetMovieData";
import { type GetStaticPropsContext } from "next";
import Error from "next/error";
import type MovieDB from "node-themoviedb";

function MovieDetailsPage({
  movie,
  similarMovies,
}: {
  movie: MovieDB.Responses.Movie.GetDetails | null;
  similarMovies: MovieDB.Responses.Movie.GetDetails[] | null;
}) {
  if (!movie) {
    return (
      <Error statusCode={500} title={"Some error occured getting details.."} />
    );
  }
  return (
    <DashboardLayout>
      <section className="container my-10">
        <div className="mb-5">
          <BackButton />
        </div>

        {movie && (
          <>
            <MovieDetail movie={movie}>
              <div className="mt-10 flex items-center ">
                <AddToFavBtn movie={movie} />
              </div>
            </MovieDetail>
            {similarMovies && (
              <div className="mt-10">
                <SimilarMovies movies={similarMovies} />
              </div>
            )}
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default MovieDetailsPage;

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const movie = await getMovieDetails(context.params?.movie_id as string);
    const similarMovies = await getSimilar({
      movie_id: context.params?.movie_id as string,
      page: 1,
    });
    return {
      props: { movie, similarMovies },
      revalidate: 60 * 60 * 24 * 30, // 30 days
    };
  } catch (e) {
    return {
      props: { movie: null, similarMovies: null },
      revalidate: 60 * 60 * 6, // 6 hours
    };
  }
}

export async function getStaticPaths() {
  const promises = movieSectionTypes.map((type) => getList({ type, page: 1 }));
  const [nowPlaying, upcoming, popular, topRated] = await Promise.all(promises);

  const movieIdSet = new Set<number>();

  const allMovies = [];
  if (nowPlaying) allMovies.push(...nowPlaying);
  if (upcoming) allMovies.push(...upcoming);
  if (popular) allMovies.push(...popular);
  if (topRated) allMovies.push(...topRated);

  allMovies.forEach((movie) => {
    movieIdSet.add(movie.id);
  });
  const paths = [...movieIdSet].map((id) => ({
    params: { movie_id: String(id) },
  }));
  return { paths, fallback: "blocking" };
}

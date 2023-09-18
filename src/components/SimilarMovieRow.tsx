import MovieDB from "node-themoviedb";
import MoviePreview from "./MoviePreview";

function SimilarMovies({ movies }: { movies: MovieDB.Responses.Movie.GetDetails[] }) {
  if (!movies) {
    return "loading";
  }
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-2xl font-medium capitalize">Similar Movies</h1>
      <div className="flex flex-wrap items-center gap-5">
        {movies?.slice(0, 18)?.map((movie, index) => (
          <MoviePreview key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default SimilarMovies;


export function SimilarMoviesSkeleton() {
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-2xl font-medium capitalize bg-gray-400 animate-pulse">Loading...</h1>
      <div className="flex flex-wrap items-center gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <div key={index} className="w-32 h-64 bg-gray-400 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

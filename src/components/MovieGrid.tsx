import type MovieDB from "node-themoviedb";
import MoviePreview, { MoviePreviewSkeleton } from "./MoviePreview";

function MovieGrid({
  movies,
  title,
}: {
  title: string;
  movies: MovieDB.Objects.Movie[] | MovieDB.Responses.Movie.GetDetails[];
}) {
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-2xl font-medium capitalize">{title}</h1>
      {movies?.length > 0 ? (
        <div className="flex flex-wrap items-center gap-5">
          {movies?.slice(0, 18)?.map((movie, index) => (
            <MoviePreview key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-xl bg-slate-100">
          No movies found
        </div>
      )}
    </div>
  );
}

export default MovieGrid;

export function MovieRowSkeleton({ amount }: { amount: number }) {
  const MoviesSkeleton = [];
  for (let i = 0; i < amount; i++) {
    MoviesSkeleton.push(<MoviePreviewSkeleton key={"skeleton" + i} />);
  }
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-2xl font-medium capitalize">Loading...</h1>
      <div className="flex flex-wrap items-center gap-5">{MoviesSkeleton}</div>
    </div>
  );
}

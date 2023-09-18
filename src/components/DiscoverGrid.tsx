import type MovieDB from "node-themoviedb";
import MovieGrid from "./MovieGrid";

type LIST_TYPES = "POPULAR" | "TOPRATED" | "NOWPLAYING" | "UPCOMING";

const LIST_NAMES = {
  POPULAR: "Popular",
  TOPRATED: "Top Rated",
  NOWPLAYING: "Now Playing",
  UPCOMING: "Upcoming",
};

function DiscoverGrid({
  type,
  movies,
}: {
  type: LIST_TYPES;
  movies: MovieDB.Responses.Movie.GetDetails[];
}) {
  return <MovieGrid movies={movies} title={LIST_NAMES[type]} />;
}

export default DiscoverGrid;

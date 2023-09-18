import type MovieDB from "node-themoviedb";
import MovieGrid from "./MovieGrid";

export default function SearchResultGrid({
  movies,
}: {
  movies: MovieDB.Responses.Movie.GetDetails[];
  query: string;
}) {
  return (
    <MovieGrid
      movies={movies}
      title={`Search Result : ${movies.length} results found`}
    />
  );
}

import { api } from "@/utils/api";
import Error from "next/error";
import MovieGrid, { MovieRowSkeleton } from "./MovieGrid";

export default function SearchResultGrid({ query }: { query: string }) {
  const {
    data: movies,
    error,
    isLoading,
  } = api.movie.search.useQuery(
    {
      query,
    },
    {
      enabled: Boolean(query),
    }
  );

  if (isLoading) {
    return <MovieRowSkeleton amount={18} />;
  }

  if (error) {
    return (
      <Error statusCode={error.data?.httpStatus ?? 500} title={error.message} />
    );
  }

  if (movies) {
    return (
      <MovieGrid
        movies={movies}
        title={`Search Result : ${movies.length} results found`}
      />
    );
  }
}

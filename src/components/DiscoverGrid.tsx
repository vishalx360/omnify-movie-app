import { api } from "@/utils/api";
import MovieGrid, { MovieRowSkeleton } from "./MovieGrid";

type LIST_TYPES = "POPULAR" | "TOPRATED" | "NOWPLAYING" | "UPCOMING";

const LIST_NAMES = {
  POPULAR: "Popular",
  TOPRATED: "Top Rated",
  NOWPLAYING: "Now Playing",
  UPCOMING: "Upcoming",
};

function DiscoverGrid({ type }: { type: LIST_TYPES }) {
  const { data, isLoading } = api.movie.getList.useQuery({ type });
  if (isLoading) {
    return <MovieRowSkeleton amount={18} />;
  }
  if (data) {
    return <MovieGrid movies={data} title={LIST_NAMES[type]} />;
  }
}

export default DiscoverGrid;

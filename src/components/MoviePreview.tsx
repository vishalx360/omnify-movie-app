import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type MovieDB from "node-themoviedb";

function MoviePreview({
  movie,
}: {
  movie: MovieDB.Responses.Movie.GetDetails | MovieDB.Responses.Movie.GetDetails;
}) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group flex h-64 w-32 transform cursor-pointer flex-col items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
    >
      <motion.div
        className="h-3/4 w-full"
        layoutId={`image:${movie.id}`}
      >
        <Image
          unoptimized
          height={640}
          width={320}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="wifull h-full rounded-md object-cover shadow-md"
        />
      </motion.div>
      <motion.p layoutId={`title:${movie.id}`} className="mt-2 w-28 truncate text-center text-sm underline-offset-2 group-hover:underline">
        {movie.title}
      </motion.p>
    </Link>
  );
}

export default MoviePreview;

export function MoviePreviewSkeleton() {
  return (
    <div className="border-1 h-64  min-h-[60px] w-32 animate-pulse rounded-xl border-gray-400 bg-gray-400/50 p-2  px-4 py-3 shadow" />
  );
}

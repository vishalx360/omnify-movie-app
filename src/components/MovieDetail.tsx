import { motion } from "framer-motion";
import type MovieDB from "node-themoviedb";
import ImageWithFallback from "./ImageWithFallback";
function MovieDetail({
  movie,
  children,
}: {
  movie: MovieDB.Responses.Movie.GetDetails;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-10">
      <motion.div className="w-[250px]" layoutId={`image:${movie.id}`}>
        <ImageWithFallback
          unoptimized
          placeholder="blur"
          blurDataURL="/placeholder.png"
          height={300}
          width={200}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="h-full w-full rounded-lg object-cover"
        />
      </motion.div>
      <div className="max-w-[700px]  p-6">
        <h2 className="mb-2 text-2xl font-semibold md:text-4xl">
          {movie.title}
        </h2>
        <div className="text-md flex items-center gap-5">
          <p className="text-gray-600  ">Released : {movie.release_date}</p>
          <p className="text-gray-600  ">Rating : {movie.vote_average}</p>
        </div>
        <p className="mb-4 mt-10 leading-8 text-gray-700">
          Synopsis: {movie.overview}
        </p>
        {children}
      </div>
    </div>
  );
}

export default MovieDetail;

export function MovieDetailSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-10">
      <div className="h-[300px] w-[250px] animate-pulse rounded-lg bg-gray-400" />
      <div className="max-w-[700px] p-6">
        <div className="mb-2 h-10 animate-pulse rounded-xl bg-gray-400 text-2xl font-semibold md:text-4xl"></div>
        <div className="text-md mt-5 flex items-center gap-5">
          <div className="h-5 w-52 animate-pulse rounded-xl bg-gray-400 text-gray-600"></div>
          <div className="h-5 w-52 animate-pulse rounded-xl bg-gray-400 text-gray-600"></div>
        </div>
        <div className="mb-4 mt-5 h-5 animate-pulse rounded-xl bg-gray-400 leading-8 text-gray-700"></div>
        <div className="mb-4  mt-5 h-5 animate-pulse rounded-xl bg-gray-400 leading-8 text-gray-700"></div>
      </div>
    </div>
  );
}

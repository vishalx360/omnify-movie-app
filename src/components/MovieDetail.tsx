import { motion } from "framer-motion";
import Image from "next/image";
import type MovieDB from "node-themoviedb";
function MovieDetail({
  movie,
  children,
}: {
  movie: MovieDB.Responses.Movie.GetDetails;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:gap-10 items-center justify-center md:flex-row md:justify-start">
      <motion.div
        className="w-[250px]"
        layoutId={`image:${movie.id}`}
      >
        <Image
          unoptimized
          placeholder="blur"
          blurDataURL="/placeholder.png"
          height={300}
          width={200}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="w-full h-full rounded-lg object-cover"
        />
      </motion.div>
      <div className="max-w-[700px]  p-6">
        <h2
          className="mb-2 text-2xl font-semibold md:text-4xl">
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
    <div className="flex flex-col md:gap-10 items-center justify-center md:flex-row md:justify-start">
      <div className="w-[250px] h-[300px] animate-pulse bg-gray-400 rounded-lg" />
      <div className="max-w-[700px] p-6">
        <div className="mb-2 text-2xl rounded-xl h-10 font-semibold md:text-4xl bg-gray-400 animate-pulse">
        </div>
        <div className="text-md flex mt-5 items-center gap-5">
          <div className="rounded-xl h-5 w-52 text-gray-600 bg-gray-400 animate-pulse"></div>
          <div className="rounded-xl h-5 w-52 text-gray-600 bg-gray-400 animate-pulse"></div>
        </div>
        <div className="rounded-xl mb-4 h-5 mt-5 leading-8 text-gray-700 bg-gray-400 animate-pulse">
        </div>
        <div className="rounded-xl  mb-4 h-5 mt-5 leading-8 text-gray-700 bg-gray-400 animate-pulse">
        </div>
      </div>
    </div>
  );
}

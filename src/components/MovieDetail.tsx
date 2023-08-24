import Image from "next/image";
import type MovieDB from "node-themoviedb";

function MovieDetail({
  movie,
  children,
}: {
  movie: MovieDB.Objects.Movie | MovieDB.Responses.Movie.GetDetails;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-start">
      <Image
        unoptimized
        placeholder="blur"
        blurDataURL="/placeholder.png"
        height={300}
        width={200}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        className="w-[250px] rounded-lg object-cover"
      />
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

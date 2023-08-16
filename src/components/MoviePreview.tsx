import Image from 'next/image'
import Link from 'next/link'
import MovieDB from 'node-themoviedb'

function MoviePreview({ movie }: { movie: MovieDB.Objects.Movie }) {
    return (
        <Link href={`/movie/${movie.id}`} className="group cursor-pointer w-32 h-64 p-2 flex flex-col items-center justify-center hover:scale-105 transform transition-transform duration-300">
            <Image
                height={640}
                width={320}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="w-full h-3/4 object-cover rounded-md shadow-md"
            />
            <p className="w-28 group-hover:underline underline-offset-2 mt-2 text-center text-sm truncate">{movie.title}</p>
        </Link>
    )
}

export default MoviePreview


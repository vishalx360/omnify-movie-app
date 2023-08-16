import { api } from '@/utils/api';
import React from 'react'
import MoviePreview from './MoviePreview';


type LIST_TYPES = "POPULAR" | "TOPRATED" | "NOWPLAYING" | "UPCOMING"

const LIST_NAMES = {
    "POPULAR": "Popular",
    "TOPRATED": "Top Rated",
    "NOWPLAYING": "Now Playing",
    "UPCOMING": "Upcoming"
}

function MovieRow({ type }: { type: LIST_TYPES }) {

    const { data } = api.movie.getList.useQuery({ type });

    if (!data) {
        return "loading"
    }
    return (
        <div className="mb-8">
            <h1 className="text-2xl font-medium capitalize mb-4">{LIST_NAMES[type]}</h1>
            <div className="flex flex-wrap items-center gap-5">
                {data.slice(0, 18)?.map((movie, index) => (
                    <MoviePreview key={index} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default MovieRow
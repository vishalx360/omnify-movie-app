import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MovieDetail from "../src/components/MovieDetail";
import MovieDB from "node-themoviedb";

describe("MovieDetail Component", () => {
  it("renders movie details correctly", () => {
    const { getByAltText, getByText } = render(
      <MovieDetail movie={TEST_MOVIE_DATA} />
    );

    const titleElement = getByText(TEST_MOVIE_DATA.title);
    expect(titleElement).toBeInTheDocument();

    const releaseDateElement = getByText(
      `Released : ${TEST_MOVIE_DATA.release_date}`
    );
    expect(releaseDateElement).toBeInTheDocument();

    const ratingElement = getByText(`Rating : ${TEST_MOVIE_DATA.vote_average}`);
    expect(ratingElement).toBeInTheDocument();

    const overviewElement = getByText(`Synopsis: ${TEST_MOVIE_DATA.overview}`);
    expect(overviewElement).toBeInTheDocument();

    const imageElement = getByAltText(`${TEST_MOVIE_DATA.title} Poster`);
    expect(imageElement).toBeInTheDocument();
  });
});

export const TEST_MOVIE_DATA = {
  adult: false,
  backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
  belongs_to_collection: null,
  budget: 100000000,
  genres: [
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 36,
      name: "History",
    },
  ],
  homepage: "http://www.oppenheimermovie.com",
  id: 872585,
  imdb_id: "tt15398776",
  original_language: "en",
  original_title: "Oppenheimer",
  overview:
    "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
  popularity: 736.078,
  poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  production_companies: [
    {
      id: 9996,
      logo_path: "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
      name: "Syncopy",
      origin_country: "GB",
    },
    {
      id: 33,
      logo_path: "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
      name: "Universal Pictures",
      origin_country: "US",
    },
    {
      id: 507,
      logo_path: "/aRmHe6GWxYMRCQljF75rn2B9Gv8.png",
      name: "Atlas Entertainment",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "GB",
      name: "United Kingdom",
    },
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2023-07-19",
  revenue: "649000000",
  runtime: 181,
  spoken_language: [
    {
      iso_639_1: "nl",
      name: "Nederlands",
    },
  ],
  status: "Released",
  tagline: "The world forever changes.",
  title: "Oppenheimer",
  video: false,
  vote_average: 8.3,
  vote_count: 1966,
} satisfies MovieDB.Responses.Movie.GetDetails;

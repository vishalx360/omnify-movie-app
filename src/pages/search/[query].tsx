import DashboardLayout from "@/components/DashboardLayout";
import MovieGrid from "@/components/MovieGrid";
import { getSearchResults } from "@/utils/GetMovieData";
import { type GetStaticPropsContext } from "next";
import type MovieDB from "node-themoviedb";

function SearchResultPage({
  results,
}: {
  results: MovieDB.Responses.Movie.GetDetails[];
}) {
  return (
    <DashboardLayout>
      <section className="container my-10">
        <MovieGrid
          movies={results}
          title={`Search Result : ${results.length} results found`}
        />
      </section>
    </DashboardLayout>
  );
}

export default SearchResultPage;

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const results = await getSearchResults({
      query: context.params?.query as string,
      page: 1,
    });
    return {
      props: { results },
      revalidate: 60 * 60 * 6, // 6 hours
    };
  } catch (e) {
    return {
      props: { results: [] },
      revalidate: 60 * 60 * 6, // 6 hours
    };
  }
}

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

import DashboardLayout from "@/components/DashboardLayout";
import SearchResultGrid from "@/components/SearchResultGrid";
import { useRouter } from "next/router";

function SearchResultPage() {
  const router = useRouter();
  return (
    <DashboardLayout>
      <section className="container my-10">
        <SearchResultGrid query={String(router.query?.query)} />
      </section>
    </DashboardLayout>
  );
}

export default SearchResultPage;

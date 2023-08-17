import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";
import { ExternalLinkIcon } from "lucide-react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <MainNav />
      <div className="w-full p-2 bg-neutral-100 lg:hidden ">
        <SearchInput />
      </div>
      {children}
    </main>
  );
}

export default DashboardLayout;

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Favorites", path: "/favorites" },
  { name: "Github", isExternal: true, path: "https://github.com/vishalx360/omnify-movie-app" },
];
function MainNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <nav className="border-gray-200 bg-neutral-100 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-medium dark:text-white">
            Omnify Movie App
          </span>
        </Link>
        <div className="hidden lg:block">
          <SearchInput />
        </div>

        <div className="flex items-center justify-center gap-10">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700  dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8  md:border-0 md:p-0 md:dark:bg-gray-900">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center hover:underline py-2 pl-3 pr-4  underline-offset-2 ",
                      currentPath === item.path && "underline"
                    )}
                    target="_blank"
                    aria-current="page"
                  >
                    {item.name}
                    {item.isExternal && <ExternalLinkIcon className="inline h-4 w-4 ml-1" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

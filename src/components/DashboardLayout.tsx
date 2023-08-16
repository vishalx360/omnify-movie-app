import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <MainNav />
      {children}
    </main>
  );
}

export default DashboardLayout;

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Favorites", path: "/favorites" },
];
function MainNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <nav className="border-gray-200 bg-neutral-100 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-medium dark:text-white">
            Omnify Movie App
          </span>
        </Link>
        <SearchInput />

        <div className="flex items-center justify-center gap-10">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700  dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8  md:border-0 md:p-0 md:dark:bg-gray-900">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={cn(
                      "block py-2 pl-3 pr-4  underline-offset-2 ",
                      currentPath === item.path && "underline"
                    )}
                    aria-current="page"
                  >
                    {item.name}
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
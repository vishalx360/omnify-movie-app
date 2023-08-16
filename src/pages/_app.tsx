import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextNprogress from "nextjs-progressbar";
import { MdArrowUpward } from "react-icons/md";
import ScrollToTop from "react-scroll-to-top";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster />
      <NextNprogress
        color="#424242"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
      <ScrollToTop
        component={<ScrollToTopButton />}
        smooth
        style={{
          background: "transparent",
          // simple shadow
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          borderRadius: "50%",
          position: "fixed",
          bottom: 20,
          overflow: "visible",
          zIndex: 100,
          right: 20,
        }}
        color="#"
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

function ScrollToTopButton() {
  return (
    <div className="group rounded-full bg-black p-2 text-white">
      <MdArrowUpward size="1.5em" />
    </div>
  );
}

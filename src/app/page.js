"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import Description from "../components/Description";
import SlidingImages from "../components/SlidingImages";
import Contact from "../components/Contact";
import Header from "../components/Header";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("hasLoaded")
      ? false
      : true
  );

  useEffect(() => {
    setHasMounted(true);
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
      document.body.style.cursor = "default";

      if (!sessionStorage.getItem("hasLoaded")) {
        const timeout = setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("hasLoaded", "true");
          document.body.style.cursor = "default";
          window.scrollTo(0, 0);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    })();
  }, []);

  if (!hasMounted) return null;

  return (
    <main className="styles.main">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <Header />
          <Landing />
          <Description />
          <Projects />
          <SlidingImages />
          <Contact />
        </>
      )}
    </main>
  );
}

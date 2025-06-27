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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasMounted(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      // Usuń window.scrollTo - może interferować z video autoplay
      // window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Inicjalizuj Locomotive Scroll dopiero po załadowaniu wszystkich komponentów
  useEffect(() => {
    if (!isLoading && hasMounted) {
      (async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        // Małe opóźnienie aby komponenty się wyrenderowały
        setTimeout(() => {
          const locomotiveScroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            },
          });

          // Cleanup przy unmount
          return () => {
            if (locomotiveScroll) locomotiveScroll.destroy();
          };
        }, 500); // Daj czas video na autoplay
      })();
    }
  }, [isLoading, hasMounted]);

  if (!hasMounted) return null;

  return (
    <main className="styles.main" data-scroll-container>
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

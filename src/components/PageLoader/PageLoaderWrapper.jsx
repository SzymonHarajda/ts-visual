"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import PageLoader from "./index.jsx";
import usePageLoader from "../../hooks/usePageLoader";

export default function PageLoaderWrapper() {
  const pathname = usePathname();
  const { isLoading, shouldShowContent } = usePageLoader();
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    // Sprawdź czy to home page
    setIsHomePage(pathname === "/");
  }, [pathname]);

  // Przewijanie do góry przy każdej zmianie ścieżki
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    // Przewiń do góry przy zmianie ścieżki
    scrollToTop();

    // Dodatkowe przewinięcie po krótkim opóźnieniu dla pewności
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <>
      {/* PageLoader tylko dla stron innych niż home */}
      {!isHomePage && (
        <AnimatePresence mode="wait">
          {isLoading && <PageLoader />}
        </AnimatePresence>
      )}
      
      {/* Ukryj kontent podczas ładowania (tylko dla stron innych niż home) */}
      {!isHomePage && !shouldShowContent && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: '#0a0a0a',
            zIndex: 9998,
            pointerEvents: 'none'
          }} 
        />
      )}
      
      {/* Dodatkowy overlay dla lepszego blokowania kontentu (tylko dla stron innych niż home) */}
      {!isHomePage && isLoading && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'transparent',
            zIndex: 9997,
            pointerEvents: 'auto'
          }} 
        />
      )}
    </>
  );
} 
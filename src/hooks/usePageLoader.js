"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function usePageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [shouldShowContent, setShouldShowContent] = useState(true);
  const pathname = usePathname();
  const timeoutRef = useRef(null);
  const isInitialMount = useRef(true);
  const navigationStartTime = useRef(null);

  // Funkcja do przewijania do góry strony
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Jeśli to pierwsze załadowanie strony, nie pokazuj loadera
    if (isInitialMount.current) {
      setCurrentPath(pathname);
      setShouldShowContent(true);
      isInitialMount.current = false;
      return;
    }

    // Jeśli ścieżka się zmieniła, pokaż loader i ukryj kontent natychmiast
    if (currentPath !== pathname) {
      // NIE pokazuj loadera jeśli przechodzimy na home page (/)
      if (pathname === "/") {
        setCurrentPath(pathname);
        setShouldShowContent(true);
        scrollToTop();
        return;
      }

      navigationStartTime.current = Date.now();
      setIsLoading(true);
      setShouldShowContent(false);
      
      // Przewiń do góry strony
      scrollToTop();
      
      // Wyczyść poprzedni timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Minimalny czas wyświetlania loadera (800ms)
      const minLoadingTime = 800;
      const elapsedTime = Date.now() - (navigationStartTime.current || 0);
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setCurrentPath(pathname);
        setShouldShowContent(true);
        
        // Dodatkowe przewinięcie do góry po zakończeniu ładowania
        setTimeout(() => {
          scrollToTop();
        }, 100);
      }, remainingTime);
    }
  }, [pathname, currentPath]);

  // Obsługa kliknięć w linki - pokaż loader natychmiast
  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.href.includes('#') && !link.href.includes('javascript:')) {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Jeśli link prowadzi do innej strony
        if (url.pathname !== currentUrl.pathname) {
          // NIE pokazuj loadera jeśli przechodzimy na home page (/)
          if (url.pathname === "/") {
            return;
          }
          
          setIsLoading(true);
          setShouldShowContent(false);
          navigationStartTime.current = Date.now();
          
          // Przewiń do góry strony
          scrollToTop();
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  // Obsługa nawigacji wstecz/naprzód
  useEffect(() => {
    const handlePopState = () => {
      // NIE pokazuj loadera jeśli przechodzimy na home page (/)
      if (window.location.pathname === "/") {
        return;
      }
      
      setIsLoading(true);
      setShouldShowContent(false);
      navigationStartTime.current = Date.now();
      
      // Przewiń do góry strony
      scrollToTop();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cleanup przy odmontowaniu
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startLoading = () => {
    // NIE pokazuj loadera jeśli jesteśmy na home page (/)
    if (pathname === "/") {
      return;
    }
    
    setIsLoading(true);
    setShouldShowContent(false);
    navigationStartTime.current = Date.now();
    
    // Przewiń do góry strony
    scrollToTop();
  };

  const stopLoading = () => {
    setIsLoading(false);
    setShouldShowContent(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Przewiń do góry strony
    scrollToTop();
  };

  return { isLoading, shouldShowContent, startLoading, stopLoading };
} 
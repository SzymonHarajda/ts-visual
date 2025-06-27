"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";

const videoSrc = "/test/landing_vod.mp4";

export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playAttempted, setPlayAttempted] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer - wykrywa gdy sekcja jest widoczna
  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            console.log("Landing section is in view");
          }
        });
      },
      { threshold: 0.1 } // Uruchom gdy 10% sekcji jest widoczne
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isClient, isInView]);

  // Progressive video loading i autoplay
  useEffect(() => {
    if (!isInView || !videoRef.current || playAttempted) return;

    const video = videoRef.current;
    setPlayAttempted(true);

    const attemptPlay = async () => {
      try {
        // Ustaw video na cichy tryb
        video.muted = true;
        video.volume = 0;
        video.defaultMuted = true;

        // Spróbuj odtworzyć
        const playPromise = video.play();

        if (playPromise !== undefined) {
          await playPromise;
          console.log("Video autoplay successful on intersection");
        }
      } catch (error) {
        console.log("Autoplay still blocked:", error);
        setupGlobalInteractionListener();
      }
    };

    // Małe opóźnienie dla lepszej synchronizacji
    setTimeout(attemptPlay, 200);
  }, [isInView, playAttempted]);

  // Globalny listener na całą stronę
  const setupGlobalInteractionListener = () => {
    const playOnAnyInteraction = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
          console.log("Video started on global interaction");

          // Usuń listenery po udanym odtworzeniu
          document.removeEventListener("touchstart", playOnAnyInteraction);
          document.removeEventListener("scroll", playOnAnyInteraction);
          document.removeEventListener("click", playOnAnyInteraction);
          window.removeEventListener("scroll", playOnAnyInteraction);
        } catch (err) {
          console.log("Global interaction play failed:", err);
        }
      }
    };

    // Dodaj listenery na różne eventy globalnie
    document.addEventListener("touchstart", playOnAnyInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("scroll", playOnAnyInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("click", playOnAnyInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("scroll", playOnAnyInteraction, {
      once: true,
      passive: true,
    });
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    console.log("Video loaded and ready");
  };

  const handleVideoError = (e) => {
    console.error(`Error loading video: ${videoSrc}`, e);
  };

  if (!isClient) return null;

  return (
    <main ref={containerRef} className={styles.main}>
      <div className={styles.videoWrapper}>
        {/* Ładuj video tylko gdy sekcja jest widoczna */}
        {isInView && (
          <video
            ref={videoRef}
            className={styles.backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata" // Ładuj tylko metadane na początku
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            controls={false}
            disablePictureInPicture
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback image gdy video nie jest załadowane */}
        {!isInView && (
          <div
            className={styles.videoPlaceholder}
            style={{
              backgroundImage: `url('/test/landing_poster.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </div>
    </main>
  );
}

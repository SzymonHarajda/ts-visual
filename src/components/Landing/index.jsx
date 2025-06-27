"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";

const videoSrc = "/test/landing_vod.mp4";

export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    // Detect mobile devices
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (videoRef.current && isClient) {
      const video = videoRef.current;

      // Force play attempt for mobile devices
      const attemptPlay = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log("Autoplay prevented, waiting for user interaction:", error);

          // Add event listeners for user interaction (niewidoczne dla użytkownika)
          const playOnInteraction = () => {
            video.play().catch((e) => console.log("Play failed:", e));
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("scroll", playOnInteraction);
          };

          // Dodaj więcej eventów dla lepszego pokrycia
          document.addEventListener("touchstart", playOnInteraction, { once: true });
          document.addEventListener("click", playOnInteraction, { once: true });
          document.addEventListener("scroll", playOnInteraction, { once: true });
        }
      };

      if (videoLoaded) {
        attemptPlay();
      }
    }
  }, [isClient, videoLoaded]);

  const handleVideoError = (e) => {
    console.error(`Error loading or playing video: ${videoSrc}`, e);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      // Próba odtworzenia dla wszystkich urządzeń
      videoRef.current.play().catch((e) => console.log("Autoplay blocked:", e));
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.videoWrapper}>
        {isClient && (
          <video
            ref={videoRef}
            className={styles.backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoCanPlay}
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            controls={false}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </main>
  );
}

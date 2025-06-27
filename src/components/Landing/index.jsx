"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";

const videoSrc = "/test/landing_vod.mp4";

export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !isClient) return;

    const video = videoRef.current;
    let hasTriedAutoplay = false;

    // Funkcja do próby uruchomienia video
    const tryPlayVideo = async () => {
      if (hasTriedAutoplay) return;
      hasTriedAutoplay = true;

      try {
        // Ustaw volume na 0 dla pewności
        video.volume = 0;
        video.muted = true;

        await video.play();
        console.log("Video started successfully");
      } catch (error) {
        console.log("Autoplay failed, setting up interaction listeners:", error);
        setupInteractionListeners();
      }
    };

    // Event listeners dla interakcji użytkownika
    const setupInteractionListeners = () => {
      const events = ["touchstart", "touchend", "mousedown", "keydown", "scroll"];

      const playOnInteraction = async (e) => {
        try {
          video.muted = true;
          video.volume = 0;
          await video.play();
          console.log("Video started after user interaction");

          // Usuń wszystkie event listenery
          events.forEach((event) => {
            document.removeEventListener(event, playOnInteraction);
            window.removeEventListener(event, playOnInteraction);
          });
        } catch (err) {
          console.log("Failed to play video on interaction:", err);
        }
      };

      // Dodaj event listenery
      events.forEach((event) => {
        document.addEventListener(event, playOnInteraction, {
          once: true,
          passive: true,
        });
        window.addEventListener(event, playOnInteraction, {
          once: true,
          passive: true,
        });
      });

      // Cleanup function
      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, playOnInteraction);
          window.removeEventListener(event, playOnInteraction);
        });
      };
    };

    // Próbuj odtworzyć gdy video jest gotowe
    if (videoReady) {
      // Małe opóźnienie dla pewności
      setTimeout(tryPlayVideo, 100);
    }

    return setupInteractionListeners();
  }, [isClient, videoReady]);

  const handleVideoError = (e) => {
    console.error(`Error loading video: ${videoSrc}`, e);
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded");
    setVideoReady(true);
  };

  const handleVideoCanPlay = () => {
    console.log("Video can play");
    if (!videoReady) {
      setVideoReady(true);
    }
  };

  if (!isClient) return null;

  return (
    <main className={styles.main}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoCanPlay}
          onLoadedMetadata={() => console.log("Metadata loaded")}
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          controls={false}
          disablePictureInPicture
          style={{ pointerEvents: "none" }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}

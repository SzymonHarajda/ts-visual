"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";

const videoSrc = "/test/landing_vod.mp4";
// Dodaj ścieżkę do obrazka, który będzie plakatem
const videoPoster = "/test/landing_poster.png";

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

    const tryPlayVideo = async () => {
      if (hasTriedAutoplay || video.currentTime > 0) return; // Nie próbuj ponownie, jeśli już gra
      hasTriedAutoplay = true;

      try {
        video.volume = 0;
        video.muted = true;
        await video.play();
        console.log("Video started successfully");
      } catch (error) {
        console.log(
          "Autoplay was blocked by the browser. Setting up interaction listeners.",
          error
        );
        setupInteractionListeners();
      }
    };

    const setupInteractionListeners = () => {
      const events = ["touchstart", "mousedown", "keydown"];

      const playOnInteraction = async () => {
        if (video.currentTime > 0) return; // Już gra, nie rób nic więcej
        try {
          video.muted = true;
          video.volume = 0;
          await video.play();
          console.log("Video started after user interaction");

          // Usuń listenery po udanym odtworzeniu
          events.forEach((event) => {
            document.removeEventListener(event, playOnInteraction);
          });
        } catch (err) {
          console.log("Failed to play video on interaction:", err);
        }
      };

      events.forEach((event) => {
        document.addEventListener(event, playOnInteraction, {
          once: true,
          passive: true,
        });
      });

      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, playOnInteraction);
        });
      };
    };

    // Próbuj odtworzyć, gdy wideo jest gotowe do odtwarzania
    if (videoReady) {
      setTimeout(tryPlayVideo, 100);
    }

    // Zwróć funkcję cleanup, która jest uruchamiana, gdy komponent jest odmontowywany
    // lub gdy zależności (isClient, videoReady) się zmieniają.
    return setupInteractionListeners();
  }, [isClient, videoReady]);

  const handleVideoCanPlay = () => {
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
          preload="auto" // Zmienione z 'metadata' na 'auto' by spróbować pobrać więcej danych
          poster={videoPoster} // <-- WAŻNY DODATEK
          onCanPlay={handleVideoCanPlay}
          controls={false}
          disablePictureInPicture
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}

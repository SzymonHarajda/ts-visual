"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";

const introVideoSrc = "/test/intro.mp4"; // Bardzo lekkie, 1-2 sekundowe intro
const mainVideoSrc = "/test/landing_vod.mp4"; // Główne video
const videoPoster = "/test/landing_poster.png";

export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("intro"); // "intro" lub "main"
  const [introCompleted, setIntroCompleted] = useState(false);
  const introVideoRef = useRef(null);
  const mainVideoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!introVideoRef.current || !isClient) return;

    const introVideo = introVideoRef.current;
    let hasTriedAutoplay = false;

    const tryPlayIntro = async () => {
      if (hasTriedAutoplay) return;
      hasTriedAutoplay = true;

      try {
        introVideo.volume = 0;
        introVideo.muted = true;
        await introVideo.play();
        console.log("Intro video started successfully");
      } catch (error) {
        console.log("Intro autoplay blocked, setting up interaction listeners:", error);
        setupInteractionListeners();
      }
    };

    const setupInteractionListeners = () => {
      const events = ["touchstart", "mousedown", "keydown", "scroll"];

      const playOnInteraction = async () => {
        try {
          introVideo.muted = true;
          introVideo.volume = 0;
          await introVideo.play();
          console.log("Intro video started after user interaction");

          // Usuń listenery po udanym odtworzeniu
          events.forEach((event) => {
            document.removeEventListener(event, playOnInteraction);
          });
        } catch (err) {
          console.log("Failed to play intro video on interaction:", err);
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

    // Natychmiastowa próba odtworzenia intro
    setTimeout(tryPlayIntro, 100);

    return setupInteractionListeners();
  }, [isClient]);

  // Obsługa przejścia z intro do głównego video
  const handleIntroEnded = async () => {
    console.log("Intro video ended, switching to main video");
    setIntroCompleted(true);
    setCurrentVideo("main");

    // Natychmiastowe uruchomienie głównego video (przeniesienie zaufania)
    setTimeout(async () => {
      if (mainVideoRef.current) {
        try {
          mainVideoRef.current.muted = true;
          mainVideoRef.current.volume = 0;
          await mainVideoRef.current.play();
          console.log("Main video started with trust transfer");
        } catch (error) {
          console.log("Failed to start main video:", error);
        }
      }
    }, 50);
  };

  const handleIntroCanPlay = () => {
    console.log("Intro video can play");
  };

  const handleMainVideoCanPlay = () => {
    console.log("Main video can play");
  };

  const handleVideoError = (e, type) => {
    console.error(`Error loading ${type} video:`, e);
  };

  if (!isClient) return null;

  return (
    <main className={styles.main}>
      <div className={styles.videoWrapper}>
        {/* Intro Video - bardzo lekkie, 1-2 sekundy */}
        {currentVideo === "intro" && (
          <video
            ref={introVideoRef}
            className={styles.backgroundVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={handleIntroCanPlay}
            onEnded={handleIntroEnded}
            onError={(e) => handleVideoError(e, "intro")}
            controls={false}
            disablePictureInPicture
            webkit-playsinline="true"
          >
            <source src={introVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Main Video - główne, cięższe video */}
        {currentVideo === "main" && (
          <video
            ref={mainVideoRef}
            className={styles.backgroundVideo}
            loop
            muted
            playsInline
            preload={introCompleted ? "auto" : "none"} // Ładuj tylko po intro
            poster={!introCompleted ? videoPoster : undefined}
            onCanPlay={handleMainVideoCanPlay}
            onError={(e) => handleVideoError(e, "main")}
            controls={false}
            disablePictureInPicture
            webkit-playsinline="true"
          >
            <source src={mainVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </main>
  );
}

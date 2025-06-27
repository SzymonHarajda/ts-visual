"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";

// Ścieżka do wideo jest teraz stała
const videoSrc = "/test/landing_vod.mp4";

export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVideoError = (e) => {
    console.error(`Error loading or playing video: ${videoSrc}`, e);
  };

  return (
    <main className={styles.main}>
      <div className={styles.videoWrapper}>
        {isClient && (
          <video
            ref={videoRef}
            className={styles.backgroundVideo}
            autoPlay // Automatyczne odtwarzanie
            loop // Zapętlanie
            muted // Wyciszenie (konieczne dla autoplay)
            playsInline // Odtwarzanie w linii (konieczne dla iOS)
            preload="auto"
            onError={handleVideoError}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </main>
  );
}

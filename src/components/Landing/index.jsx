"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const videos = ["/test/main_1.mp4", "/test/main_2.mp4", "/test/main_3.mp4"];

export default function Landing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Sprawdź czy to urządzenie mobilne
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      setVideoError(false);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleVideoError = () => {
    console.error(`Error loading video: ${videos[currentIndex]}`);
    setVideoError(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // Funkcja do uruchomienia video na mobilnych
  const handleVideoLoad = () => {
    if (videoRef.current && isMobile) {
      videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
    }
  };

  return (
    <main className={styles.main}>
      <AnimatePresence>
        {videos.map(
          (video, index) =>
            index === currentIndex && !videoError && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={styles.videoWrapper}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className={styles.backgroundVideo}
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  preload="metadata"
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </main>
  );
}
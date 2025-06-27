"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const videos = ["/test/main_1.mp4", "/test/main_2.mp4", "/test/main_3.mp4"];

export default function Landing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);

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
                            autoPlay
                            muted
                            playsInline
                            loop
                            className={styles.backgroundVideo}
                            onError={handleVideoError}
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
"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";

const videoSrc = "/test/landing_vod.mp4";

export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !isClient) return;

    const video = videoRef.current;
    let autoplayAttempted = false;

    const attemptAutoplay = async () => {
      if (autoplayAttempted) return;
      autoplayAttempted = true;

      try {
        video.muted = true;
        video.volume = 0;
        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise !== undefined) {
          await playPromise;
          console.log("Video autoplay successful");
          setVideoStarted(true);
          setShowPlayPrompt(false);
        }
      } catch (error) {
        console.log("Autoplay blocked:", error);
        setShowPlayPrompt(true);
        setupClickToPlay();
      }
    };

    const setupClickToPlay = () => {
      const playVideo = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
          video.muted = true;
          video.volume = 0;
          await video.play();
          console.log("Video started after click");
          setVideoStarted(true);
          setShowPlayPrompt(false);

          // Usuń event listeners
          if (containerRef.current) {
            containerRef.current.removeEventListener("click", playVideo);
            containerRef.current.removeEventListener("touchstart", playVideo);
          }
          document.removeEventListener("click", playVideo);
          document.removeEventListener("touchstart", playVideo);
        } catch (err) {
          console.error("Failed to play video:", err);
        }
      };

      // Dodaj listenery na różne elementy
      if (containerRef.current) {
        containerRef.current.addEventListener("click", playVideo, { once: true });
        containerRef.current.addEventListener("touchstart", playVideo, { once: true });
      }

      // Backup - cały dokument
      document.addEventListener("click", playVideo, { once: true });
      document.addEventListener("touchstart", playVideo, { once: true });

      // Dodatkowe eventy
      document.addEventListener("scroll", playVideo, { once: true });
      document.addEventListener("keydown", playVideo, { once: true });
    };

    // Próbuj autoplay po załadowaniu metadanych
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      setTimeout(attemptAutoplay, 100);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      if (!autoplayAttempted) {
        setTimeout(attemptAutoplay, 50);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);

    // Cleanup
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [isClient]);

  const handleVideoError = (e) => {
    console.error(`Error loading video: ${videoSrc}`, e);
  };

  const handleDirectClick = async (e) => {
    e.preventDefault();
    if (!videoStarted && videoRef.current) {
      try {
        videoRef.current.muted = true;
        await videoRef.current.play();
        setVideoStarted(true);
        setShowPlayPrompt(false);
      } catch (error) {
        console.error("Direct click play failed:", error);
      }
    }
  };

  if (!isClient) return null;

  return (
    <main
      ref={containerRef}
      className={styles.main}
      onClick={handleDirectClick}
    >
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={handleVideoError}
          controls={false}
          disablePictureInPicture
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          onClick={handleDirectClick}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay do kliknięcia */}
        {showPlayPrompt && (
          <div className={styles.clickOverlay} onClick={handleDirectClick}>
            <div className={styles.playPrompt}>
              Tap to start
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

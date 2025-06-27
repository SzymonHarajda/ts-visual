"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";
import useLocomotiveScroll from "@/hooks/useLocomotiveScroll";

const About = () => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  useEffect(() => {
    // Sprawdź czy to urządzenie mobilne
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Tylko na desktop używaj Locomotive Scroll
  useLocomotiveScroll(!isMobile);

  return (
    <>
      <div ref={container} className={styles.aboutPage}>
        <section className={styles.about}>
          <div className={styles.aboutText}>
            <h2>
              <strong>tmvisual</strong> is the way to make your project unique.
            </h2>
            <p>
              We are a small studio based in Gdańsk, Poland, founded by a 3D
              artist - Tomasz Michałek.
            </p>
            <p>
              With a background in architecture, we specialize in crafting
              photorealistic visuals that bring spaces, interiors and products
              to life. Whether your dream idea should be projected as an image
              or animation, we are ready to make it real.
            </p>
            <p>
              For inquiries, collaborations or to explore our latest work, feel
              free to get in touch.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              height={800}
              width={600}
              src="/modern/cam_2.jpg"
              alt="Tomasz Michałek"
              className={styles.image}
              priority // Dla lepszej wydajności
            />
          </div>
        </section>
        <motion.div style={{ height }} className={styles.circleContainer}>
          <div className={styles.circle}></div>
        </motion.div>
      </div>
    </>
  );
};

export default About;

"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";
import Image from "next/image";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // Ustawienia wymiarów dla animacji SVG
  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Obsługa progresu animacji
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100; // Upewnij się, że progres nie przekroczy 100%
        }
        return prevProgress + 1; // Progres wzrasta co 1%
      });
    }, 50); // Czas między krokami animacji

    return () => clearInterval(interval); // Sprzątanie po zakończeniu
  }, []);

  // Ścieżki SVG dla animacji
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      <>
        <motion.div variants={opacity} initial="initial" animate="enter">
          <div className={styles.loading}>
            <div className={styles.logoContainer}>
              <Image
                src={"/TM-VISUAL.png"}
                alt="Logo"
                width={500}
                height={500}
                className={styles.logoImage} // Dodanie klasy do obrazu
              />
              <motion.div
                className={styles.cover}
                style={{ height: `${100 - progress}%` }}
                animate={{ height: 0 }} // Dodano animację zmniejszania wysokości
                transition={{ duration: 2, ease: "easeInOut" }} // Czas i styl animacji
              />
            </div>
          </div>
        </motion.div>
        <svg>
          <motion.path
            variants={curve}
            initial="initial"
            exit="exit"
          ></motion.path>
        </svg>
      </>
    </motion.div>
  );
}

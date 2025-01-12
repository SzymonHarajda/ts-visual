"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/glowna_1.jpg", "/glowna_2.jpg", "/glowna_3.jpg"];
export default function Landing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence>
        {images.map(
          (image, index) =>
            index === currentIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Image src={image} alt={`bg-photo`} fill={true} />
              </motion.div>
            )
        )}
      </AnimatePresence>
    </main>
  );
}

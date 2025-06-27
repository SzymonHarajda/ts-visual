import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
  {
    color: "white",
    src: "/small/cam_2.jpg",
  },
  {
    color: "white",
    src: "/grano/cam_3.jpg",
  },
  {
    color: "white",
    src: "/Arlon/Lobby.jpg",
  },
  {
    color: "white",
    src: "/Souverain/cam_12.jpg",
  },
];

const slider2 = [
  {
    color: "white",
    src: "/small/cam_5.jpg",
  },
  {
    color: "white",
    src: "/grano/CAM_4.jpg",
  },
  {
    color: "white",
    src: "/modern/cam_3.jpg",
  },
  {
    color: "white",
    src: "/Arlon/cam_14.jpg",
  },
];

export default function SlidingImages() {
  const container = useRef(null);

  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    const check = () => setIsStatic(window.innerWidth <= 1200);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  if (isStatic) {
    // Statyczny układ dla <=1024px, teraz 6 zdjęć (3 z slider1, 3 z slider2)
    return (
      <div ref={container} className={styles.slidingImages}>
        <div className={styles.staticSliderWrapper}>
          {[...slider1.slice(0, 3), ...slider2.slice(0, 3)].map(
            (project, index) => (
              <div
                key={index}
                className={styles.staticProject}
                style={{ backgroundColor: project.color }}
              >
                <div className={styles.staticImageContainer}>
                  <Image fill={true} alt={"image"} src={project.src} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => {
          return (
            <>
              <hr />
              <div
                key={index}
                className={styles.project}
                style={{ backgroundColor: project.color }}
              >
                <div key={index} className={styles.imageContainer}>
                  <Image
                    key={index}
                    fill={true}
                    alt={"image"}
                    src={`${project.src}`}
                  />
                </div>
              </div>
            </>
          );
        })}
      </motion.div>

      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => {
          return (
            <>
              <hr />
              <div
                key={index}
                className={styles.project}
                style={{ backgroundColor: project.color }}
              >
                <div key={index} className={styles.imageContainer}>
                  <Image fill={true} alt={"image"} src={`${project.src}`} />
                </div>
              </div>
            </>
          );
        })}
      </motion.div>

      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}

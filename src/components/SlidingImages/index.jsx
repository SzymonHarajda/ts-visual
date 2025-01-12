import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
  {
    color: "#e3e5e7",

    src: "/small/cam_2.jpg",
  },

  {
    color: "#d6d7dc",

    src: "/grano/cam_3.jpg",
  },

  {
    color: "#e3e3e3",

    src: "/Arlon/Lobby.jpg",
  },

  {
    color: "#e3e3d9",

    src: "/Souverain/cam_12.jpg",
  },
];

const slider2 = [
  {
    color: "#d4e3ec",

    src: "/small/cam_5.jpg",
  },

  {
    color: "#e5e0e1",

    src: "/grano/CAM_4.jpg",
  },

  {
    color: "#d7d4cf",

    src: "/modern/cam_3.jpg",
  },

  {
    color: "#e1dad6",

    src: "/Arlon/cam_14.jpg",
  },
];

export default function index() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => {
          return (
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
          );
        })}
      </motion.div>

      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => {
          return (
            <div
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div key={index} className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={`${project.src}`} />
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}

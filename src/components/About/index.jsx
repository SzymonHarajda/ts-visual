"use client";
import React, { useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";

const About = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <>
      <div ref={container} className={styles.aboutPage}>
        <section className={styles.about}>
          <div className={styles.aboutContainer}>
            </div>
            <div className={styles.aboutText}>
              <h2>
                <strong>tmvisual </strong>is the way to make your project unique.
              </h2>
              <p>
                We are a small studio based in Gdańsk, Poland. Founded by a
                3D artist - Tomasz Michałek
              </p>
              <p>
                With background in architecture we specialize in crafting photorealistic visuals that bring spaces,
                interiors, and products to life.
                Whether your dream idea should be projected as an image or animation – we are ready to make it real.
              </p>
              <p>
                For inquiries, collaborations, or to explore latest work, feel free to
                get in touch.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                width={650}
                height={350}
                src="/12th_floor_roofbar.jpg"
                alt="Tomasz Michałek"
                className={styles.image}
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

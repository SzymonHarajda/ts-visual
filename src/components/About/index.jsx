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
            <div className={styles.imageContainer}>
              <Image
                width={400}
                height={400}
                src="/hero.png"
                alt="Tomasz Michałek"
                className={styles.image}
              />
            </div>
            <div className={styles.aboutText}>
              <p>
                Tomasz Michałek is a 3D Artist based in Gdańsk, Poland. With a
                background in architecture, he specializes in crafting
                photorealistic visualizations that bring spaces, interiors, and
                products to life. His work seamlessly blends technical precision
                with artistic vision, helping brands and designers transform
                ideas into immersive visual experiences.
              </p>
              <p>
                Driven by a passion for detail and realism, Tomasz collaborates
                with architects, interior designers, and product developers to
                create compelling CGI renderings that tell a story. His
                expertise extends to lighting, textures, and composition,
                ensuring each project captures the essence of its subject with
                clarity and depth.
              </p>
              <p>
                For inquiries, collaborations, or to explore his latest work,
                feel free to get in touch.
              </p>
            </div>
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

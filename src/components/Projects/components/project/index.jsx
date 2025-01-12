"use client";
import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const anim = {
  initial: { width: 0 },

  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },

  closed: { width: 0 },
};

const UniformImage = ({ src, alt }) => {
  return (
    <div className={styles.uniformImageContainer}>
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
};
export default function index({ project }) {
  const [isActive, setIsActive] = useState(false);

  const { title1, title2, src } = project;

  return (
    <div
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
      className={styles.project}
    >
      <p>
        <strong>{title1}</strong>
      </p>
      <p id={styles.gap}>{title2}</p>
      <p>
        <motion.div
          variants={anim}
          animate={isActive ? "open" : "closed"}
          className={styles.imgContainer}
        >
          <UniformImage src={src} alt="img" />
        </motion.div>
      </p>
    </div>
  );
}

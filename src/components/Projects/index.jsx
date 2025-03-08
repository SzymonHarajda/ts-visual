"use client";
import styles from "./page.module.scss";
import Projects from "./components/project";
import Rounded from "../../common/RoundedButton";
import React from "react";
const projects = [
  {
    title1: "Small",
    title2: "Apartment",
    src: "/small/cam_1.jpg",
  },
  {
    title1: "Grano",
    title2: "Apartments",
    src: "/grano/CAM_1.jpg",
  },
  {
    title1: "Modern",
    title2: "Cabin",
    src: "/modern/cam_1.jpg",
  },
];

export default function Project() {
  return (
    <main className={styles.projects}>
      <div className={styles.body}>
        <Projects />

      </div>

    </main>
  );
}

"use client";
import React from "react";
import styles from "./page.module.scss";
import Magnetic from "../../../../common/Magnetic";


export default function Projects() {


  return (
    <div
      className={styles.project}
    >
      <Magnetic >
        <strong className={styles.prg}>Work</strong>
      </Magnetic>

    </div>
  );
}

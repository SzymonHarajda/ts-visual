"use client";
import React from "react";
import styles from "./page.module.scss";
import Magnetic from "../../../../common/Magnetic";
import Link from "next/link";


export default function Projects() {


  return (
    <div
      className={styles.project}
    >
        <Magnetic >
          <Link href={'/work'}>
          <strong className={styles.prg}>Work</strong>
          </Link>
        </Magnetic>

    </div>
  );
}

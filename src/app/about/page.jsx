"use client";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import About from "../../components/About";
import Contact from "../../components/Contact";
import styles from "./styles.module.scss";

const AboutPage = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);

  return (
    <div className={styles.aboutPageMain}>
      <Header />
      <div className={styles.separator} />
      <About />
      <Contact />
    </div>
  );
};

export default AboutPage;

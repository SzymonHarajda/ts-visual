"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import About from "../../components/About";
import Contact from "../../components/Contact";
import styles from "./styles.module.scss";

const AboutPage = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Identyczna implementacja jak w głównej stronie
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
      
      // Cleanup jeśli potrzebny
      return () => {
        if (locomotiveScroll) locomotiveScroll.destroy();
      };
    })();
  }, []);

  if (!hasMounted) return null;

  return (
    <div className={styles.aboutPageMain} data-scroll-container>
      <Header />
      <div className={styles.separator} />
      <About />
      <Contact />
    </div>
  );
};

export default AboutPage;

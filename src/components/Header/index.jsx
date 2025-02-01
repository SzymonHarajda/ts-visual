"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./nav";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight / 2,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
        },
      },
    });
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.logo}>
          <p className={styles.copyright}>©</p>
          <Link href="/">
            <Image
              src="/TM-VISUAL.svg"
              width={120}
              height={20}
              alt="TM Visual Logo"
            />
          </Link>
        </div>

        <div className={styles.nav}>
          <Magnetic>
            <div
              className={`${styles.el} ${
                pathname === "/work" ? styles.elActive : ""
              }`}
            >
              <Link href="/work">Work</Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div
              className={`${styles.el} ${
                pathname === "/about" ? styles.elActive : ""
              }`}
            >
              <Link href="/about">About</Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div
              className={`${styles.el} ${
                pathname === "/contact" ? styles.elActive : ""
              }`}
            >
              <Link href="/contact">Contact</Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div>
      </div>

      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          backgroundColor="#535762"
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>

      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}

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
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight / 2,
        onLeave: () => {
          setShowButton(true);
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          setShowButton(false);
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
        },
      },
    });
  }, []);

  // Prefetch pages on hover
  const handleLinkHover = (href) => {
    if (href !== pathname) {
      // Prefetch the page
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  };

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.logo}>
          <p className={styles.copyright}>©</p>
        </div>

        <div className={styles.centerLogo}>
          <Link href="/">
            <Image
              src="/TM-VISUAL.svg"
              width={300}
              height={50}
              alt="TM Visual Logo"
            />
          </Link>
        </div>

        <div className={styles.nav}>
          {isMobile ? (
            <Magnetic>
              <div
                className={styles.el}
                onClick={() => setIsActive(true)}
                style={{ userSelect: "none" }}
              >
                <a>Menu</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          ) : (
            <>
              <Magnetic>
                <div
                  className={`${styles.el} ${pathname === "/" ? styles.elActive : ""}`}
                  onMouseEnter={() => handleLinkHover("/")}
                >
                  <Link href="/">Home</Link>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
              <Magnetic>
                <div
                  className={`${styles.el} ${pathname === "/work" ? styles.elActive : ""}`}
                  onMouseEnter={() => handleLinkHover("/work")}
                >
                  <Link href="/work">Work</Link>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
              <Magnetic>
                <div
                  className={`${styles.el} ${pathname === "/about" ? styles.elActive : ""}`}
                  onMouseEnter={() => handleLinkHover("/about")}
                >
                  <Link href="/about">About</Link>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
              <Magnetic>
                <div
                  className={`${styles.el} ${pathname === "/contact" ? styles.elActive : ""}`}
                  onMouseEnter={() => handleLinkHover("/contact")}
                >
                  <Link href="/contact">Contact</Link>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
            </>
          )}
        </div>
      </div>

      {(showButton || isActive) && (
        <div ref={button} className={styles.headerButtonContainer} style={{ transform: 'scale(1)' }}>
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
      )}

      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}

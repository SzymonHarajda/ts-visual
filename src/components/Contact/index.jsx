import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef, useState, useEffect } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";
import styles from "./style.module.scss";

export default function Contact() {
  const container = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x_mobile = useTransform(scrollYProgress, [0, 1], [-20, 50]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <motion.div
      style={isDesktop ? {} : {}}
      ref={container}
      className={styles.contact}
    >
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/hero.png`} />
            </div>
            <h2> {`Let's work`} </h2>
          </span>
          <h2>together</h2>
          <Link href="/contact">
            <div data-scroll data-scroll-speed={0.1}>
              {isDesktop ? (
                <motion.div style={{ x }} className={styles.buttonContainer}>
                  <Rounded
                    backgroundColor={"#535762"}
                    className={styles.button}
                  >
                    <p>Get in touch</p>
                  </Rounded>
                </motion.div>
              ) : (
                <motion.div
                  style={{ x: x_mobile }}
                  className={styles.buttonContainer}
                >
                  <Rounded
                    backgroundColor={"#535762"}
                    className={styles.button}
                  >
                    <p>Get in touch</p>
                  </Rounded>
                </motion.div>
              )}
            </div>
          </Link>
          {isDesktop ? (
            <svg
              style={{ rotate: "90deg", scale: 2 }}
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.staticSvg}
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </svg>
          ) : (
            <motion.svg
              style={{ rotate, scale: 2 }}
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </motion.svg>
          )}
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>t.michalek@tm-visual.com</p>
          </Rounded>
          <Rounded>
            <p>+48 607 051 081</p>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <h3>Version</h3>
              <p>2025 © Edition</p>
            </span>
          </div>
          <div>
            <span>
              <h3>socials</h3>
              <Magnetic>
                <p>
                  <a href="https://www.behance.net/tomaszmichalek">Behance</a>
                </p>
              </Magnetic>
            </span>
            <Magnetic>
              <p>
                <a href="https://www.linkedin.com/in/tomasz-micha%C5%82ek">
                  Linkedin
                </a>
              </p>
            </Magnetic>
            <Magnetic>
              <p>
                <a href="https://www.instagram.com/tmvisual__/#">Instagram</a>
              </p>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

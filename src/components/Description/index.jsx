import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../common/RoundedButton";
import Link from "next/link";
export default function Description() {

  const phrase =
      "Helping brands stand out in the digital era with cutting-edge \n" +
      "visual representation, that capture attention and inspire action. \n" +
      "Together, we will make a difference and engage your potential \n" +
      "clients. Many years of experience in this field give us a unique \n" +
      "position to transform your idea into bold, innovative storytelling.";
  const description = useRef(null);
  const isInView = useInView(description, {
        threshold: 0.5,
        once: false
    });

  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
          <p>
              {phrase.split(" ").map((word, index) => (
                  <span key={index} className={styles.mask}>
      <motion.span
          layout
          variants={slideUp}
          custom={index}
          animate={isInView ? "open" : "closed"}
      >
        {word}
      </motion.span>
    </span>
              ))}
          </p>

          <Link href={"/about"}>
            <div data-scroll data-scroll-speed={0.1}>
                <Rounded className={styles.button}>
                    <p>About</p>
                </Rounded>
            </div>
          </Link>
      </div>
    </div>
  );
}

import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../common/RoundedButton";
import Link from "next/link";
export default function Description() {

  const phrase =
    "Helping brands stand out in the digital era with cutting-edge \n" +
      "visual representati\n" +
      " ons, that capture attention and inspire action. \n" +
      "Together, we will make a dierence and engage your potential \n" +
      "clients. Many years of experience in this field give us a unique \n" +
      "position to transform your idea into bold, innovative storytel\n" +
      " ling.";
  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>

        <div data-scroll data-scroll-speed={0.1}>
          <Link href={"/about"}>
              <Rounded className={styles.button}>
              <p>About</p>
            </Rounded>
          </Link>
        </div>
      </div>
    </div>
  );
}

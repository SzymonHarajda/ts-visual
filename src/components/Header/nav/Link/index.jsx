import styles from "./style.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "../../anim";
import { usePathname } from "next/navigation";

export default function Links({ data, isActive, setSelectedIndicator }) {
  const { title, href, index } = data;
  const pathname = usePathname();

  const handleMouseEnter = () => {
    setSelectedIndicator(href);
    
    // Prefetch page on hover
    if (href !== pathname) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  };

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={handleMouseEnter}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      ></motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}

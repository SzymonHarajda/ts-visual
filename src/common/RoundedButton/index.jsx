import React from "react";
import { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import Magnetic from "../Magnetic";

export default function Rounded({
  children,
  backgroundColor = "#2c2e32",
  noMagnetic = false,
  noAnim = false,
  ...attributes
}) {
  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;
  useEffect(() => {
    if (noAnim) return;
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, [noAnim]);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  const ButtonContent = (
    <div
      className={styles.roundedButton}
      style={{ overflow: "hidden" }}
      {...(!noAnim && {
        onMouseEnter: manageMouseEnter,
        onMouseLeave: manageMouseLeave,
      })}
      {...attributes}
    >
      {children}
      {!noAnim && (
        <div
          ref={circle}
          style={{ backgroundColor }}
          className={styles.circle}
        ></div>
      )}
    </div>
  );

  if (noMagnetic) {
    return ButtonContent;
  }
  return <Magnetic>{ButtonContent}</Magnetic>;
}

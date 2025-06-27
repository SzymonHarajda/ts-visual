"use client";
import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";

const useLocomotiveScroll = () => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      smartphone: {
        smooth: true,
        breakpoint: 767,
      },
      tablet: {
        smooth: false,
        breakpoint: 1024,
      },
      touchMultiplier: 2,
    });
    document.body.style.cursor = "default";
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);
};

export default useLocomotiveScroll;

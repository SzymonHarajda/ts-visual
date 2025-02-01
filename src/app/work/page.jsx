"use client";
import React, { useEffect } from "react";

export default function Work() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);

  return <div>work</div>;
}

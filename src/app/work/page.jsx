"use client";
import styles from "./page.module.scss";
import WorkProject from "./components/WorkProject";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import useLocomotiveScroll from "@/hooks/useLocomotiveScroll";

const projects = [
  {
    title: "Arlon 53",
    category: "Architecture",
    image: "/Arlon/cam_1.jpg",
    slug: "arlon-53",
    type: "big",
  },
  {
    title: "Plac Uni",
    category: "Interior",
    image: "/small/cam_5.jpg",
    slug: "plac-uni",
    type: "small",
  },
  {
    title: "Grano Residence",
    category: "Interior",
    image: "/grano/CAM_1.jpg",
    slug: "grano-residence",
    type: "small",
  },
  {
    title: "Masurian Cabin",
    category: "Architecture",
    image: "/modern/cam_1.jpg",
    slug: "masurian-cabin",
    type: "small",
  },
  {
    title: "Souverain 100",
    category: "Architecture",
    image: "/Souverain/cam_1.jpg",
    slug: "souverain-100",
    type: "big",
  },
];

export default function Work() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  useLocomotiveScroll();

  useEffect(() => {
    // Przewiń do góry strony
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1400);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // For mobile screens (≤1024px), display projects individually
  if (isMobile) {
    return (
      <>
        <Header />
        <main className={styles.workPage}>
          <div className={styles.mobileProjects}>
            {projects.map((project, index) => (
              <div key={index} className={styles.mobileProjectCell}>
                <WorkProject project={project} />
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

  // For desktop screens (>1024px), use the original row-based layout
  const rows = [];
  let currentRow = [];
  let currentRowWidth = 0;

  projects.forEach((project) => {
    const isSmall = project.type === "small";
    const projectWidth = isSmall ? 1 / 3 : 1; // Small takes 1/3 width, big takes full width

    // If adding this project would exceed row width or row is already full
    if (
      currentRowWidth + projectWidth > 1 ||
      (currentRow.length > 0 && !isSmall && currentRow[0].type === "small") ||
      (currentRow.length > 0 && isSmall && currentRow[0].type === "big")
    ) {
      // Start a new row
      rows.push([...currentRow]);
      currentRow = [project];
      currentRowWidth = projectWidth;
    } else {
      // Add to current row
      currentRow.push(project);
      currentRowWidth += projectWidth;
    }
  });

  // Add the last row if it exists
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <>
      <Header />
      <main className={styles.workPage}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.projectRow}>
            {row.map((project, projectIndex) => {
              const isSmallInSmallGroup = project.type === "small";
              const isDoubleWidth = isSmallInSmallGroup && row.length === 2;

              return (
                <div
                  key={projectIndex}
                  className={`${styles.projectCell} ${
                    project.type === "big"
                      ? styles.bigCell
                      : isDoubleWidth
                      ? styles.doubleCell
                      : styles.smallCell
                  }`}
                >
                  <WorkProject project={project} />
                </div>
              );
            })}
          </div>
        ))}
      </main>
    </>
  );
}

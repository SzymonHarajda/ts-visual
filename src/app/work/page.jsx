"use client";
import styles from "./page.module.scss";
import WorkProject from "./components/WorkProject";
import { useRef } from "react";
import Header from "@/components/Header";

const projects = [
  {
    title: "Small Apartment",
    category: "Interior",
    year: "2023",
    image: "/small/cam_1.jpg",
    slug: "small-apartment",
    type: "small"
  },
  {
    title: "Grano Apartments",
    category: "Architecture",
    year: "2022",
    image: "/grano/CAM_1.jpg",
    slug: "grano-apartments",
    type: "small"
  },
  {
    title: "Modern Cabin",
    category: "Interior",
    year: "2023",
    image: "/modern/cam_1.jpg",
    slug: "modern-cabin",
    type: "small"
  },
  {
    title: "Small Apartment",
    category: "Interior",
    year: "2023",
    image: "/small/cam_1.jpg",
    slug: "small-apartment",
    type: "big"
  },
  // Add type to rest of projects (alternating between small and big)
  // ...
];

export default function Work() {
  const containerRef = useRef(null);

  // Group projects into rows
  const rows = [];
  let currentRow = [];
  let currentRowWidth = 0;

  projects.forEach(project => {
    const isSmall = project.type === "small";
    const projectWidth = isSmall ? 1/3 : 1; // Small takes 1/3 width, big takes full width

    // If adding this project would exceed row width or row is already full
    if (currentRowWidth + projectWidth > 1 ||
        (currentRow.length > 0 && !isSmall && currentRow[0].type === "small") ||
        (currentRow.length > 0 && isSmall && currentRow[0].type === "big")) {
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
        <Header/>
        <main className={styles.workPage}>
          {rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.projectRow}>
                {row.map((project, projectIndex) => {
                  const isSmallInSmallGroup = project.type === "small";
                  const isDoubleWidth = isSmallInSmallGroup && row.length === 2;

                  return (
                      <div
                          key={projectIndex}
                          className={`${styles.projectCell} ${project.type === "big" ?
                              styles.bigCell :
                              isDoubleWidth ? styles.doubleCell : styles.smallCell}`}
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
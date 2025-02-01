"use client";
import styles from "./page.module.scss";
import Projects from "./components/project";
import Rounded from "../../common/RoundedButton";
const projects = [
  {
    title1: "Small",
    title2: "Apartment",
    src: "/small/cam_1.jpg",
    color: "#8C8C8C",
  },
  {
    title1: "Grano",
    title2: "Apartments",
    src: "/grano/CAM_1.jpg",
    color: "#EFE8D3",
  },
  {
    title1: "Modern",
    title2: "Cabin",
    src: "/modern/cam_1.jpg",
    color: "#706D63",
  },
];

export default function Project() {
  return (
    <main className={styles.projects}>
      <div className={styles.body}>
        {projects.map((project, index) => {
          return <Projects project={project} key={index} />;
        })}
      </div>
      <div>
        <Rounded>
          <p>More work</p>
        </Rounded>
      </div>
    </main>
  );
}

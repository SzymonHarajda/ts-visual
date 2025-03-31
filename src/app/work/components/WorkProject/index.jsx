"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WorkProject({ project }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={styles.projectCard}
        >
            <Link href={`/work/${project.slug}`} className={styles.projectItem}>
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={styles.imageContainer}
                >
                    <div
                        className={styles.imageWrapper}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            quality={100}
                            sizes={project.type === "big" ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                            className={styles.projectImage}
                            priority
                        />
                    </div>

                    <div className={styles.projectInfo}>
                        <h2>{project.title}</h2>
                        <div className={styles.projectMeta}>
                            <span>{project.category}</span>
                            <span>{project.year}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import useLocomotiveScroll from "@/hooks/useLocomotiveScroll";
import React from "react";

const projects = {
    "plac-uni": {
        title: "Plac Uni",
        subtitle: "Interior Design, 2024",
        description: "Interior design for an apartment located at modern residential complex located in the centre district of Gdynia, Poland.",
        category: "Interior Design",
        images: [
            { src: "/small/cam_1.jpg", orientation: "landscape" },
            { src: "/small/cam_2.jpg", orientation: "portrait" },
            { src: "/small/cam_5.jpg", orientation: "portrait" },
            { src: "/small/cam_6.jpg", orientation: "portrait" },
            { src: "/small/cam_7_closeup.jpg", orientation: "portrait" },
        ]
    },
    "grano-residence": {
        title: "Grano Residence",
        description: "Interior design for an apartment located at Grano Residence, a modern residential and hotel complex located on Chmielna Street in Gdańsk, within the prestigious Granary Island area.\n" +
            "\n",
        category: "Interior",
        images: [
            { src: "/grano/CAM_5.jpg", orientation: "landscape" },
            { src: "/grano/CAM_1.jpg", orientation: "portrait" },
            { src: "/grano/CAM_2.jpg", orientation: "portrait" },
            { src: "/grano/CAM_3.jpg", orientation: "portrait" },
            { src: "/grano/CAM_4.jpg", orientation: "portrait" },
            { src: "/grano/CAM_6.jpg", orientation: "portrait" },
        ]
    },
    "masurian-cabi": {
        title: "Masurian Cabi",
        description: "Tucked away in the heart of a serene Masurian village, this modern cabin is a true retreat into nature. Nestled beside a small, unique lake, it stands in perfect solitude, embraced by towering pines and whispering birches. With no neighbors in sight, the only company here is the gentle rustling of leaves, the soft lapping of water, and the occasional song of a passing bird.",
        category: "Interior",
        images: [
            { src: "/modern/cam_3.jpg", orientation: "landscape" },
            { src: "/modern/cam_1.jpg", orientation: "portrait" },
            { src: "/modern/cam_2.jpg", orientation: "portrait" },
            { src: "/modern/cam_4.jpg", orientation: "portrait" },
        ]
    },
    "arlon-53": {
        title: "Arlon 53",
        description: "Originally constructed in the 1970s with a Brutalist architectural style, the building is being redeveloped into a modern office complex. The redevelopment involves a comprehensive renovation that preserves the building's distinctive architectural features while updating its facilities to meet contemporary standards.",
        category: "Interior",
        images: [
            { src: "/Arlon/cam_1.jpg", orientation: "landscape" },
            { src: "/Arlon/cam_10.jpg", orientation: "portrait" },
            { src: "/Arlon/cam_12.jpg", orientation: "landscape" },
            { src: "/Arlon/cam_13.jpg", orientation: "landscape" },
            { src: "/Arlon/cam_14.jpg", orientation: "landscape" },
            { src: "/Arlon/10th_floor.jpg", orientation: "landscape" },
            { src: "/Arlon/12th_floor_roofbar.jpg", orientation: "landscape" },
            { src: "/Arlon/12th_floor_stairs.jpg", orientation: "landscape" },
            { src: "/Arlon/cam_drone.jpg", orientation: "landscape" },
            { src: "/Arlon/Conference.jpg", orientation: "landscape" },
            { src: "/Arlon/Lobby.jpg", orientation: "landscape" },
        ]
    },
    "souverain-100": {
        title: "Souverain 100",
        description: "The office building at Boulevard du Souverain 100 in Brussels, originally constructed in the 1970s, is undergoing a significant renovation to modernize its facilities while preserving its architectural heritage. The design team is focused on maintaining the building's distinctive 20th-century identity, enhancing its connection to the surrounding natural environment, and promoting sustainability.",
        category: "Interior",
        images: [
            { src: "/Souverain/cam_1.jpg", orientation: "landscape" },
            { src: "/Souverain/cam_2.jpg", orientation: "landscape" },
            { src: "/Souverain/cam_3.jpg", orientation: "landscape" },
            { src: "/Souverain/cam_6.jpg", orientation: "landscape" },
            { src: "/Souverain/cam_12.jpg", orientation: "landscape" },
            { src: "/Souverain/cam_25_interior.jpg", orientation: "landscape" },
        ]
    },
};

export default function ProjectPage() {
    const pathname = usePathname();
    const slug = pathname.split("/").pop();
    const project = projects[slug];
    useLocomotiveScroll();

    return (
        <>
            <Header />
            <main className={styles.projectPage}>


                <div className={styles.projectImages}>
                    {(() => {
                        const elements = [];
                        for (let i = 0; i < project.images.length; i++) {
                            const image = project.images[i];
                            if (!image) continue; // Bezpieczne sprawdzenie

                            // Funkcja pomocnicza do renderowania obrazu z overlay, gdy jest pierwszy obraz (indeks 0)
                            const renderImage = (img, altText, priorityFlag) => (
                                <div className={styles.relativeContainer}>
                                    <Image
                                        src={img.src}
                                        alt={altText}
                                        fill
                                        quality={100}
                                        priority={priorityFlag}
                                        className={styles.projectImage}
                                    />
                                    <div className={styles.overlayTile}>
                                        <h2>{project.title}</h2>
                                        <p>{project.description}</p>
                                    </div>
                                </div>
                            );

                            if (image.orientation === "landscape") {
                                // Elementy landscape wyświetlamy pojedynczo
                                elements.push(
                                    <motion.div
                                        key={`landscape-${i}`}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={styles.imageContainer}
                                    >
                                        {i === 0
                                            ? renderImage(image, `${project.title} ${i + 1}`, true)
                                            : (
                                                <Image
                                                    src={image.src}
                                                    alt={`${project.title} ${i + 1}`}
                                                    fill
                                                    quality={100}
                                                    priority={i === 0}
                                                    className={styles.projectImage}
                                                />
                                            )}
                                    </motion.div>
                                );
                            } else if (image.orientation === "portrait") {
                                // Grupowanie zdjęć portrait po dwa, wyświetlane obok siebie
                                const nextImage = project.images[i + 1];
                                if (nextImage && nextImage.orientation === "portrait") {
                                    elements.push(
                                        <div key={`portrait-${i}`} className={styles.portraitRow}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className={`${styles.imageContainer} ${styles.portraitContainer}`}
                                            >
                                                {i === 0
                                                    ? renderImage(image, `${project.title} ${i + 1}`, true)
                                                    : (
                                                        <Image
                                                            src={image.src}
                                                            alt={`${project.title} ${i + 1}`}
                                                            fill
                                                            quality={100}
                                                            className={styles.projectImage}
                                                        />
                                                    )}
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className={`${styles.imageContainer} ${styles.portraitContainer}`}
                                            >
                                                <Image
                                                    src={nextImage.src}
                                                    alt={`${project.title} ${i + 2}`}
                                                    fill
                                                    quality={100}
                                                    className={styles.projectImage}
                                                />
                                            </motion.div>
                                        </div>
                                    );
                                    i++; // pomijamy kolejny obraz, bo już został użyty
                                } else {
                                    elements.push(
                                        <motion.div
                                            key={`portrait-${i}`}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className={`${styles.imageContainer} ${styles.portraitContainer}`}
                                        >
                                            {i === 0
                                                ? renderImage(image, `${project.title} ${i + 1}`, true)
                                                : (
                                                    <Image
                                                        src={image.src}
                                                        alt={`${project.title} ${i + 1}`}
                                                        fill
                                                        quality={100}
                                                        className={styles.projectImage}
                                                    />
                                                )}
                                        </motion.div>
                                    );
                                }
                            }
                        }
                        return elements;
                    })()}
                </div>

            </main>
        </>
    );
}
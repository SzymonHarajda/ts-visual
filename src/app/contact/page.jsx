"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Header from "../../components/Header";
import emailjs from "emailjs-com";
import useLocomotiveScroll from "@/hooks/useLocomotiveScroll";

export default function Contact() {
  const container = useRef(null);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.message) tempErrors.message = "Message is required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      setStatus("");
      return;
    }
    setErrors({});

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("Thank you for your message!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setStatus("Failed to send message. Please try again.");
      });
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  useEffect(() => {
    // Przewiń do góry strony
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);
  useLocomotiveScroll();
  return (
    <>
      <Header />
      <div ref={container} className={styles.contact}>
        <div className={styles.body}>
          <div className={styles.title}>
            <span>
              <div className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={`/hero.png`} />
              </div>
              <h2>{`Let's start a project together`}</h2>
            </span>

            <form
              id="form"
              onSubmit={handleSubmit}
              className={styles.contactForm}
            >
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={styles.styledInput}
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Enter your name..."
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className={styles.styledInput}
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Enter your email..."
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <input
                  id="message"
                  name="message"
                  type="text"
                  className={styles.styledInput}
                  onChange={handleChange}
                  value={formData.message}
                  placeholder="Enter your message..."
                />
                {errors.message && <p>{errors.message}</p>}
              </div>
              <div className={styles.title2}></div>
              {status && <p className={styles.statusMessage}>{status}</p>}
            </form>

            <div className={styles.buttonContainer}>
              <Rounded
                backgroundColor={"#535762"}
                onClick={handleButtonClick}
                className={styles.button}
              >
                <p>Send</p>
              </Rounded>
            </div>

            <svg
              style={{ scale: 2 }}
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </svg>

            <div className={styles.contactDetails}>
              <h3>Contact Details</h3>
              <p>Email: t.michalek@tm-visual.com</p>
              <p>Phone: +48 607 051 081</p>
            </div>
          </div>

          <div className={styles.info}>
            <div>
              <span>
                <h3>Version</h3>
                <p>2025 © Edition</p>
              </span>
            </div>
            <div>
              <span>
                <h3>Socials</h3>
                <Magnetic>
                  <p>
                    <a href="https://www.behance.net/tomaszmichalek">Behance</a>
                  </p>
                </Magnetic>
              </span>
              <Magnetic>
                <p>
                  <a href="https://www.linkedin.com/in/tomasz-micha%C5%82ek">
                    Linkedin
                  </a>
                </p>
              </Magnetic>
              <Magnetic>
                <p>
                  <a href="https://www.instagram.com/tmvisual__/#">Instagram</a>
                </p>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

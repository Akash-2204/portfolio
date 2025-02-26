"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./emailCard.module.scss";
import emailjs from "@emailjs/browser";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const EmailCard = () => {
  const form = useRef(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : prev[name] }));
  };

  // Validate Form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!emailRegex.test(formData.user_email)) {
      newErrors.user_email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send Email
  const sendEmail = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateForm()) {
      emailjs
        .send("service_0jo4nfe", "template_g4auo7k", {
          from_name: formData.user_email, // Use sender's email
          message: `${formData.user_name}: ${formData.message}`, // Attach name and message
        },"-LemKO8II2x3JJXAv")
        .then((result) => {
          console.log("Email sent successfully!", result);
          setOpen(true);
          setFormData({ user_name: "", user_email: "", message: "" }); // Clear form
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
  };

  return (
    <section className={styles.contactSection}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Email Sent Successfully! 🎉</Alert>
      </Snackbar>

      {/* Form Container */}
      <div className={styles.contactCard}>
        <p className={styles.subtitle}>GET IN TOUCH</p>
        <h2 className={styles.title}>Contact Me.</h2>

        <form ref={form} onSubmit={sendEmail} className={styles.form}>
          <label className={styles.label}>
            Your Name *
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="What's your name?"
              className={`${styles.inputField} ${
                errors.user_name ? styles.errorField : ""
              }`}
            />
            {errors.user_name && (
              <span className={styles.errorText}>{errors.user_name}</span>
            )}
          </label>

          <label className={styles.label}>
            Your Email *
            <input
              type="text"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className={`${styles.inputField} ${
                errors.user_email ? styles.errorField : ""
              }`}
            />
            {errors.user_email && (
              <span className={styles.errorText}>{errors.user_email}</span>
            )}
          </label>

          <label className={styles.label}>
            Your Message *
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className={`${styles.inputField} ${styles.textArea} ${
                errors.message ? styles.errorField : ""
              }`}
            />
            {errors.message && (
              <span className={styles.errorText}>{errors.message}</span>
            )}
          </label>

          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailCard;

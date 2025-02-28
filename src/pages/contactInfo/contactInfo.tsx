"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./contactInfo.module.scss";
import EmailCard from "@/components/emailCard/emailCard";

const ContactInfo = () => {
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";
  const imagePath = `${basePath}/images/akash_pic.png`;

  const socialLinks = [
    { src: "https://img.icons8.com/nolan/64/resume.png", alt: "Resume", url: "https://drive.google.com/file/d/1bEAMBdyNC9bHsHmrPqjsO60vzi23Qdhv/view?usp=sharing" },
    { src: "https://img.icons8.com/nolan/64/linkedin.png", alt: "LinkedIn", url: "https://www.linkedin.com/in/akash-thirumuruganantham/" },
    { src: "https://img.icons8.com/nolan/64/github.png", alt: "GitHub", url: "https://github.com/Akash-2204" },
    { src: "https://img.icons8.com/nolan/48/instagram-new--v1.png", alt: "Instagram", url: "https://www.instagram.com/akash_thirumuruganantham/" },
  ];

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div 
        className={styles.infoSection}
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Profile Photo */}
        <motion.div 
          className={styles.photo}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Image src={imagePath} alt="My Photo" width={200} height={200} className={styles.profileImage} />
        </motion.div>

        {/* User Details */}
        <div className={styles.details}>
          <h2 className={styles.name}>Akash Thirumuruganantham</h2>
          <p className={styles.email}>athiru0499@gmail.com</p>
          <p className={styles.phone}>+1 (312)-646-8097</p>
        </div>

        {/* Social Icons */}
        <motion.div 
          className={styles.socialContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {socialLinks.map(({ src, alt, url }, index) => (
            <motion.button
              key={index}
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              className={styles.socialButton}
              whileHover={{ scale: 1.2, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={src} alt={alt} width={64} height={64} priority />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Email Card Section */}
      <motion.div 
        className={styles.emailCardSection}
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <EmailCard />
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;

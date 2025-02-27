"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./scrollDownIcon.module.scss";

const ScrollDownIcon = () => {
  const [isBottom, setIsBottom] = useState(false);

  // Detect Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setIsBottom(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconVariants = {
    start: { y: 0, opacity: 0.5 },
    end: {
      y: 10,
      opacity: 1,
      transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" as const },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div className={styles.scrollContainer} onClick={() => window.scrollTo({ top: isBottom ? 0 : document.body.scrollHeight, behavior: "smooth" })}>
      {/* Changing Text */}
      

      {/* Changing Icon */}
      <motion.div className={styles.scrollIcon} variants={iconVariants} animate="end" initial="start">
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="currentColor">
          <path d={isBottom ? "M12 8l5 5H7l5-5z" : "M12 16l-5-5h10l-5 5z"} />
        </motion.svg>
      </motion.div>
      <motion.span className={styles.scrollText} variants={textVariants} animate="visible" initial="hidden">
        {isBottom ? "Scroll Up" : "Scroll Down"}
      </motion.span>
    </div>
  );
};

export default ScrollDownIcon;

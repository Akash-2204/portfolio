"use client";
import ExperienceModal from "@/components/modal/modal";
import { experiences } from "@/utils/userData";
import styles from "./experiences.module.scss";
import { motion } from "framer-motion";

export default function Experiences() {
  return (
    <div className={styles.container}>
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className={styles.timelineItem}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* <div className={styles.lineContainer}>
            <div className={styles.line} />
            <div className={styles.index}>{`0${index + 1}`}</div>
          </div> */}
          <div className={styles.content}>
            <ExperienceModal {...exp} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

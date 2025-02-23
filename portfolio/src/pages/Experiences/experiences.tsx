"use client";
import ExperienceModal from "@/components/modal/modal";
import { experiences } from "@/utils/userData";
import styles from "./experiences.module.scss";
import { motion } from "framer-motion";
import ScrollText from "@/components/Texts/scrollText/scrollText";

export default function Experiences() {
  return (
    <div className={styles.container}>
      <div>
        <ScrollText
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Experiences
        </ScrollText>
      </div>
      <div>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={styles.timelineItem}
            initial={{ opacity: 0, x: -200 }} // More shift left (-200px)
            whileInView={{ opacity: 1, x: 0 }} // Animate into view
            exit={{ opacity: 0, x: -200 }} // Fade out when scrolled past
            viewport={{ amount: 0.2 }} // Re-trigger when scrolling up/down
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.content}>
              <ExperienceModal {...exp} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

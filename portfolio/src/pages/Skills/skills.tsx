"use client";
import Marquee from "@/components/marquee/marquee";
import ScrollText from "@/components/Texts/scrollText/scrollText";
import { skills } from "@/utils/userData";
import styles from "./skills.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 }); // Track view continuously
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 30 }); // Fade out when out of view
    }
  }, [isInView, controls]);
  return (
    <div className={styles.skillsContainer}>
      <div className={styles.sectionHeader}>
        <ScrollText
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Skills
        </ScrollText>
      </div>
      <div ref={ref}>
        {Object.entries(skills).map(([category, skillList], index) => (
          <motion.div
            key={index}
            className={styles.category}
            initial={{ opacity: 0, y: 30 }}
            animate={controls} // Controls animation dynamically
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className={styles.categoryTitle}>{category}</div>
            <Marquee className={styles.skillsList}>
              {skillList.map((skill, skillIndex) => {
                const imagePath = `/images/${skill.toLowerCase()}.png`;
                return (
                  <div key={skillIndex} className={styles.skillsItem}>
                    <Image
                      src={imagePath}
                      alt={skill}
                      width={40}
                      height={40}
                      className={styles.skillIcon}
                    />
                    <div className={styles.skillsText}>{skill}</div>
                  </div>
                );
              })}
            </Marquee>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

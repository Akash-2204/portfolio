"use client";
import { skills } from "@/utils/userData";
import styles from "./skills.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import dynamic from "next/dynamic";

const ScrollText = dynamic(() => import("@/components/Texts/scrollText/scrollText"), { ssr: false });
const Marquee = dynamic(() => import("@/components/marquee/marquee"), { ssr: false });

const Skills = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const top = ref.current.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          controls.start({ opacity: 1, y: 0 });
          ref.current.classList.add(styles.visible);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

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

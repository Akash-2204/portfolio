/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ExperienceModal from "@/components/modal/modal";
import { experiences } from "@/utils/userData";
import styles from "./experiences.module.scss";
import { motion, useInView } from "framer-motion";
import ScrollText from "@/components/Texts/scrollText/scrollText";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import WorkIcon from "@mui/icons-material/Work"; // Change icon if needed
import SchoolIcon from "@mui/icons-material/School";
import { useRef } from "react";

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

      {/* Timeline Component */}
      <Timeline position="alternate">
        {experiences.map((exp, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { amount: 0.3, once: false });
          return (
            <TimelineItem key={index} ref={ref}>
              {/* Opposite Content - Time Period */}
              <TimelineOppositeContent
                sx={{
                  m: "auto 0",
                  textAlign: index % 2 === 0 ? "right" : "left",
                  display: "flex",
                  justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                  fontFamily: "'Orbitron', sans-serif", // Add custom font
                  fontSize: "1.5rem", // Adjust font size
                  fontWeight: "600", // Make it bolder
                  color: index % 2 === 0 ? "#b784f4" : "#b784f4", // Alternate colors
                }}
              >
                {exp.duration} {/* Example: 2021 - Present */}
              </TimelineOppositeContent>

              {/* Timeline Dot and Connector */}
              <TimelineSeparator>
                {/* Top Connector with Scroll Effect */}
                <TimelineConnector
                  className={`${styles.timelineConnector} ${
                    isInView ? styles.active : styles.active
                  }`}
                />

                {/* Glowing Timeline Dot */}
                <TimelineDot
                  className={`${styles.timelineDot} ${
                    isInView ? styles.active : ""
                  }`}
                >
                  {exp.type === "school" ? (
                    <SchoolIcon sx={{ color: "#a60707" }} />
                  ) : (
                    <WorkIcon sx={{ color: "#a60707" }} />
                  )}
                </TimelineDot>

                {/* Bottom Connector with Scroll Effect */}
                <TimelineConnector
                  className={`${styles.timelineConnector} ${
                    isInView ? styles.active : ""
                  }`}
                />
              </TimelineSeparator>

              {/* Motion Animated Experience Content */}
              <TimelineContent>
                <motion.div
                //to change based on screen size
                  initial={{ opacity: 0, x: index % 2 === 0 ? 200 : -200 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <ExperienceModal {...exp} />
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}

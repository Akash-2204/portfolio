/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { experiences } from "@/utils/userData";
import styles from "./experiences.module.scss";
import { motion, useInView } from "framer-motion";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import WorkIcon from "@mui/icons-material/Work"; // Change icon if needed
import SchoolIcon from "@mui/icons-material/School";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ExperienceModal = dynamic(() => import("@/components/modal/modal"), { ssr: false });
const ScrollText = dynamic(() => import("@/components/Texts/scrollText/scrollText"), { ssr: false });

export default function Experiences() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set to true for screens below 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <Timeline position={isMobile ? "right" : "alternate"}>
        {experiences.map((exp, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { amount: 0.3, once: false });

          return (
            <TimelineItem key={index} ref={ref} sx={{
              "&::before": {
                display: "none",
                content: "none",
              },
            }}>
              {/* Opposite Content - Time Period */}
              {!isMobile ?  (
                <TimelineOppositeContent
                  sx={{
                    m: "auto 0",
                    textAlign: index % 2 === 0 ? "right" : "left",
                    display: "flex",
                    justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#b784f4",
                  }}
                >
                  {exp.duration}
                </TimelineOppositeContent>
              ):null}

              {/* Timeline Dot and Connector */}
              <TimelineSeparator>
                <TimelineConnector
                  className={`${styles.timelineConnector} ${
                    isInView ? styles.active : ""
                  }`}
                />
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
                <TimelineConnector
                  className={`${styles.timelineConnector} ${
                    isInView ? styles.active : ""
                  }`}
                />
              </TimelineSeparator>

              {/* Motion Animated Experience Content */}
              <TimelineContent>
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isMobile ? 200 : index % 2 === 0 ? 200 : -200,
                  }}
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

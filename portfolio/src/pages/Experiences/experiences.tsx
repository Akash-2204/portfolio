"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./experiences.module.scss"; 

interface Experience {
  id: number;
  company: string;
  location: string;
  description: string;
}

const experiences: Experience[] = [
  { id: 1, company: "Google", location: "Mountain View, CA", description: "Worked on frontend optimization for Ads." },
  { id: 2, company: "Spotify", location: "New York, NY", description: "Developed music recommendation features." },
  { id: 3, company: "Amazon", location: "Seattle, WA", description: "Enhanced e-commerce search experience." },
  { id: 4, company: "Meta", location: "Menlo Park, CA", description: "Built interactive social engagement tools." },
];

const ExperienceTree = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.experienceTree}>
      {/* Vertical Tree Line */}
      <div className={styles.treeLine}></div>

      {experiences.map((exp, index) => (
        <div key={exp.id} className={`${styles.experienceItem} ${index % 2 === 0 ? styles.left : styles.right}`}>
          {/* Branch Line */}
          <div className={styles.branchLine}></div>

          {/* Experience Card */}
          <motion.div
            className={`${styles.experienceCard} ${expandedId === exp.id ? styles.expanded : ""}`}
            onClick={() => toggleExpand(exp.id)}
            initial={{ scale: 1 }}
            animate={{ scale: expandedId === exp.id ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>{exp.company}</h3>
            <p>{exp.location}</p>

            {expandedId === exp.id && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {exp.description}
              </motion.p>
            )}

            <span className={styles.expandText}>
              {expandedId === exp.id ? "Click to collapse" : "Click to expand"}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTree;

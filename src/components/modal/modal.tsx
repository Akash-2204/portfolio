/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, School } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./modal.module.scss";
import SpotlightCard from "../card/card";
import CircularText from "../Texts/circularText/circularText";

interface ExperienceProps {
  company: string;
  role: string;
  duration: string;
  description: string[];
  stack: string[];
  key?: number;
  modalSize?: "sm" | "lg";
  type: string;
}

import { useEffect } from "react";

export function useMousePosition(
  ref: React.RefObject<HTMLElement>,
  callback?: ({ x, y }: { x: number; y: number }) => void
) {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;

      const { top, left } = ref.current.getBoundingClientRect();
      const x = event.pageX - left - window.scrollX + 70; // Account for scrolling
      const y = event.pageY - top - window.scrollY;

      callback?.({ x, y });
    };

    ref.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      ref.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref, callback]);
}

export default function ExperienceModal({
  company,
  role,
  type,
  duration,
  description,
  stack,
  modalSize = "lg",
}: ExperienceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024); // Initial check

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!infoRef.current) return;

    // Offset positioning to center the tooltip
    const offsetX = infoRef.current.offsetWidth / 2;
    const offsetY = infoRef.current.offsetHeight / 2;

    infoRef.current.style.setProperty("--x", `${x - offsetX}px`);
    infoRef.current.style.setProperty("--y", `${y - offsetY}px`);
  }, []);

  useMousePosition(divRef as React.RefObject<HTMLDivElement>, update);

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };
  const updateScreenSize = () => {
    setIsLargeScreen(window.innerWidth > 1024);
  };

  useEffect(() => {
    // Listen for screen resize
    window.addEventListener("resize", updateScreenSize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >
      <div
        ref={divRef}
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        aria-expanded={isOpen}
      >
        <div className={styles.details}>
          <h3 className={styles.company}>{company}</h3>
          <p className={styles.role}>{role}</p>
          {window.innerWidth < 768 ? (<span className={styles.duration}>{duration}</span>):""}
          {/* <span className={styles.duration}>{duration}</span> */}
        </div>
        <AnimatePresence>
        {isHovered && isLargeScreen && (
          <div
            ref={infoRef}
            style={{ transform: "translate(var(--x), var(--y))" }}
            className={styles.tooltip}
          >
            Read more &rarr;
          </div>
        )}
      </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div onClick={() => setIsOpen(false)} className={styles.overlay}>
            <motion.div
              initial={{ scale: 0, rotate: "180deg" }}
              animate={{
                scale: 1,
                rotate: "0deg",
                transition: {
                  type: "spring",
                  bounce: 0.25,
                },
              }}
              exit={{ scale: 0, rotate: "180deg" }}
              onClick={(e) => e.stopPropagation()}
              className={cn(styles.modal, {
                [styles.smallModal]: modalSize === "sm",
              })}
            >
              <div className={styles.modalContent}>
                {type === "school" ? (
                  <School className={styles.icon} size={40} />
                ) : (
                  <Briefcase className={styles.icon} size={40} />
                )}

                <h3
                  className={cn(styles.title, {
                    [styles.smallTitle]: modalSize === "sm",
                  })}
                >
                  {company} - {role}
                </h3>

                {/* Description as an Unordered List with Arrow Icons */}
                <ul className={styles.descriptionList}>
                  {description.map((exp, index) => (
                    <li key={index} className={styles.descriptionItem}>
                      {exp}
                    </li>
                  ))}
                </ul>

                <div className={styles.buttonContainer}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={styles.closeButton}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}

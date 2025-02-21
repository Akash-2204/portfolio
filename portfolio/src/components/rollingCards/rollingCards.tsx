/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
} from "framer-motion";
import styles from "./rollingCards.module.scss";
import { projects } from "@/utils/userData";

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = true,
}) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
    window.innerWidth <= 640
  );

  const [isDragging, setIsDragging] = useState(false);
  // 3D geometry calculations
  const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
  const faceCount: number = projects.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const dragFactor: number = 0.03;
  const radius: number = cylinderWidth / (2 * Math.PI);

  // Framer Motion values and controls
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleDragStart = () => {
    setIsDragging(true);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleDrag = (_: any, info: PanInfo) => {
    handleDragStart();
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 80, damping: 20, ease: "easeOut" },
    });
    // Restart autoplay after a delay (to prevent jumpy movement)
    setTimeout(() => {
        if (autoplay) {
          autoplayRef.current = setInterval(() => {
            controls.start({
              rotateY: rotation.get() - 0.3,
              transition: { duration: 0.2, ease: "linear" },
            });
            rotation.set(rotation.get() - 0.3);
          }, 50);
        }
      }, 2000);
    };

  // Create a 3D transform based on the rotation motion value
  const transform = useTransform(rotation, (value: number) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 0.3,
          transition: { duration: 0.2, ease: "linear" },
        });
        rotation.set(rotation.get() - 0.3);
      }, 50);

      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Pause on hover with smooth transition
  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - 0.3,
        transition: { duration: 0.2, ease: "linear" },
      });
      rotation.set(rotation.get() - 0.3);

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 0.3,
          transition: { duration: 0.2, ease: "linear" },
        });
        rotation.set(rotation.get() - 0.3);
      }, 50);
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGradientLeft}></div>
      <div className={styles.galleryGradientRight}></div>
      <div className={styles.galleryContent}>
        <motion.div
          drag="x"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles.galleryTrack}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className={styles.galleryItem}
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius + 150}px)`,
              }}
            >
              <div className={styles.projectCard}>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.stack}>
                  {project.stack.map((tech, index) => (
                    <span key={index} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;

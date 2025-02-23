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
  autoplay = true,
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

  const startAutoRotate = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      controls.start({
        rotateY: rotation.get() - 0.3,
        transition: { duration: 0.3, ease: "linear" },
      });
      rotation.set(rotation.get() - 0.3);
    }, 30); // Adjust for a smoother constant speed
  };

  const stopAutoRotate = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    controls.stop();
  };

  // Start autoplay when component mounts
  useEffect(() => {
    if (autoplay) startAutoRotate();
    return () => stopAutoRotate();
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Drag
  const handleDragStart = () => {
    setIsDragging(true);
    stopAutoRotate();
  };

  const handleDrag = (_: any, info: PanInfo) => {
    handleDragStart();
    rotation.set(rotation.get() + info.offset.x * dragFactor * 0.2);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDragEnd = (_: any) => {
    setIsDragging(false);
    setTimeout(() => {
      if (!isDragging) startAutoRotate();
    }, 1500); // Delay before resuming rotation
  };

  // Pause rotation on hover
  const handleMouseEnter = (): void => {
    if (pauseOnHover) stopAutoRotate();
  };

  // Resume rotation when mouse leaves
  const handleMouseLeave = (): void => {
    if (!isDragging) startAutoRotate();
  };

  // Create a 3D transform based on the rotation motion value
  const transform = useTransform(rotation, (value: number) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGradientLeft}></div>
      <div className={styles.galleryGradientRight}></div>
      <div className={styles.galleryContent}>
        <motion.div
          drag="x"
          className={styles.galleryTrack}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {projects.map((project, i) => (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              key={i}
              className={styles.galleryItem}
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${
                  radius + 150
                }px)`,
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

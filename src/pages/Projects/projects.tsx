"use client";
import styles from "./projects.module.scss";
import dynamic from "next/dynamic";

const ScrollText = dynamic(() => import("@/components/Texts/scrollText/scrollText"), { ssr: false });
const RollingGallery = dynamic(() => import("@/components/rollingCards/rollingCards"), { ssr: false });

const Projects = () => (
  <div className={styles.container}>
    <ScrollText
      animationDuration={1}
      ease="back.inOut(2)"
      scrollStart="center bottom+=50%"
      scrollEnd="bottom bottom-=40%"
      stagger={0.03}
    >
      Projects
    </ScrollText>

    <div className={styles.gallery}>
      <RollingGallery autoplay={true} pauseOnHover={true} />
    </div>
  </div>
);

export default Projects;

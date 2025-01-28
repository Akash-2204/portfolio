"use client";
import AvatarModel from "@/components/avatarModel/avatarModel";
import styles from "./homePage.module.scss";

export default function HomePage() {
    return (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <AvatarModel />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.contentWrapper}>
            <h1>Welcome to My Portfolio</h1>
            <p>Frontend Developer | Creative Technologist</p>
          </div>
        </div>
      </div>
    );
  }
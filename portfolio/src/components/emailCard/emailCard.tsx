"use client";

import React from "react";
import styles from "./emailCard.module.scss";

const EmailCard = () => {
  return (
    <div className={styles.emailContainer}>
      {/* Upper card */}
      <div className={styles.emailCard}>
        <h2 className={styles.title}>Send an Email</h2>
        <p className={styles.description}>
          Fill out the details below to send an email.
        </p>

        {/* From Email */}
        <div className={styles.field}>
          <label className={styles.label}>From</label>
          <p className={styles.staticText}>you@example.com</p>
        </div>

        {/* To Email */}
        <div className={styles.field}>
          <label className={styles.label}>To</label>
          <p className={styles.staticText}>recipient@example.com</p>
        </div>

        {/* Subject */}
        <div className={styles.field}>
          <label className={styles.label}>Subject</label>
          <p className={styles.staticText}>The Pokémon I caught this week</p>
        </div>

        {/* Body */}
        <div className={styles.field}>
          <label className={styles.label}>Body</label>
          <p className={`${styles.staticText} ${styles.bodyText}`}>
            I caught a Charmander, a Squirtle, and a Bulbasaur this week!
          </p>
        </div>

        {/* Send Button */}
        <div className={styles.sendButton}>
          <span role="img" aria-label="send">
            ➤
          </span>
        </div>
      </div>

      {/* Hover Celebration Animation */}
      <div className={styles.sentNotification}>
        <div className={styles.notificationText}>Email Sent! 🎉</div>
      </div>
    </div>
  );
};

export default EmailCard;

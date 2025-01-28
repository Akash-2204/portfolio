"use client";

import React from 'react';
import styles from './card.module.scss';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Card;

"use client";

import React, { useRef, useEffect, useState } from 'react';
import { initBackground } from './background.util';
import './background.module.scss';

interface BackgroundProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

const Background: React.FC<BackgroundProps> = ({
  direction = 'right',
  speed = 0.5,
  borderColor = '#111',
  squareSize = 40,
  hoverFillColor = '#222',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cleanup = initBackground({
      canvas,
      direction,
      speed,
      borderColor,
      squareSize,
      hoverFillColor,
      setHoveredSquare,
    });

    return cleanup;
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className="backgroundCanvas"></canvas>;
};

export default Background;

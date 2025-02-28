"use client";
import React from "react";
import "./globals.css";
import Background from "../components/background/background";
import Dock from "@/components/dock/dock";
import ScrollDownIcon from "@/components/scrollDownIcon/scrollDownIcon"; // Import Scroll Icon
import {
  VscHome,
  VscBriefcase,
  VscTools,
  VscProject,
  VscMail,
} from "react-icons/vsc";

const metadata = {
  title: "My App",
  description: "This is my Next.js application",
};
const handleNavigation = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    if (id != "home") {
      const offsetTop = section.offsetTop +80;
      smoothScrollTo(offsetTop, 2500); // Adjust duration for smoothness
    } else {
      const offsetTop = section.offsetTop;
      smoothScrollTo(offsetTop, 2000); // Adjust duration for smoothness
    }
  }
};

const smoothScrollTo = (target: number, duration: number) => {
  const startPosition = window.scrollY;
  const distance = target - startPosition;
  let startTime: number | null = null;

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const nextPosition = easeInOutQuad(
      timeElapsed,
      startPosition,
      distance,
      duration
    );

    window.scrollTo(0, nextPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, target);
    }
  };

  requestAnimationFrame(animation);
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const items = [
    {
      icon: <VscHome size={26} />,
      label: "Home",
      onClick: () => handleNavigation("home"),
    },
    {
      icon: <VscBriefcase size={26} />,
      label: "Experience",
      onClick: () => handleNavigation("experiences"),
    },
    {
      icon: <VscProject size={26} />,
      label: "Projects",
      onClick: () => handleNavigation("projects"),
    },
    {
      icon: <VscTools size={26} />,
      label: "Skills",
      onClick: () => handleNavigation("skills"),
    },
    {
      icon: <VscMail size={26} />,
      label: "ContactMe",
      onClick: () => handleNavigation("contactMe"),
    },
  ];

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="layout-body">
        {/* Fixed Background */}
        <div className="background-wrapper">
          <Background
            direction="diagonal"
            speed={0.5}
            borderColor="#111"
            squareSize={70}
            hoverFillColor="#001"
          />
        </div>

        {/* Scrollable Content */}
        <div className="app-container">{children}</div>

        {/* Fixed Dock at Bottom */}
        <div className="dock-container">
          <Dock
            items={items}
            panelHeight={30}
            baseItemSize={60}
            magnification={80}
          />
        </div>

        {/* Scroll Down Icon at Bottom Right */}
        <ScrollDownIcon />
      </body>
    </html>
  );
};

export default Layout;

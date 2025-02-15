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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const items = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => alert("Home!") },
    { icon: <VscBriefcase size={18} />, label: "Experience", onClick: () => alert("Experience!") },
    { icon: <VscTools size={18} />, label: "Skills", onClick: () => alert("Skills!") },
    { icon: <VscProject size={18} />, label: "Projects", onClick: () => alert("Projects!") },
    { icon: <VscMail size={18} />, label: "Contact Me", onClick: () => alert("Contact Me!") },
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
        <div className="app-container">
          {children}
        </div>

        {/* Fixed Dock at Bottom */}
        <div className="dock-container">
          <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
        </div>

        {/* Scroll Down Icon at Bottom Right */}
        <ScrollDownIcon />
      </body>
    </html>
  );
};

export default Layout;

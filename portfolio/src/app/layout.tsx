"use client";
import React from "react";
import "./globals.css";
import Background from "../components/background/background";
import Dock from "@/components/dock/dock";
import { VscHome, VscBriefcase, VscTools, VscProject, VscMail } from "react-icons/vsc";

const metadata = {
  title: "My App",
  description: "This is my Next.js application",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscBriefcase size={18} />, label: 'Experience', onClick: () => alert('Experience!') },
    { icon: <VscTools size={18} />, label: 'Skills', onClick: () => alert('Skills!') },
    { icon: <VscProject size={18} />, label: 'Projects', onClick: () => alert('Projects!') },
    { icon: <VscMail size={18} />, label: 'Contact Me', onClick: () => alert('Contact Me!') },
];
  return (
    <html lang="en">
      <head className="Layout-body">
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className="Layout-body"
        style={{ margin: 0, padding: 0, overflow: "hidden" }}
      >
        <Background
          direction="diagonal"
          speed={0.5}
          borderColor="#111"
          squareSize={70}
          hoverFillColor="#001"
        />
        <div className="app-container">
          {children}
          <Dock
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      </body>
    </html>
  );
};

export default Layout;

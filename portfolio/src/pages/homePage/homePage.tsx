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

// import LogoWall from "@/components/skillsWall/skillsWall";

// const skillsImgs = [
//   // Programming
//   { imgUrl: "/logos/python.svg", altText: "Python" },
//   { imgUrl: "/logos/javascript.svg", altText: "JavaScript" },
//   { imgUrl: "/logos/typescript.svg", altText: "TypeScript" },
//   { imgUrl: "/logos/java.svg", altText: "Java" },
//   { imgUrl: "/logos/sql.svg", altText: "SQL" },
//   { imgUrl: "/logos/cpp.svg", altText: "C/C++" },

//   // Frontend
//   { imgUrl: "/logos/react.svg", altText: "React.js" },
//   { imgUrl: "/logos/nextjs.svg", altText: "Next.js" },
//   { imgUrl: "/logos/react-native.svg", altText: "React Native" },
//   { imgUrl: "/logos/redux.svg", altText: "Redux" },
//   { imgUrl: "/logos/html.svg", altText: "HTML" },
//   { imgUrl: "/logos/css.svg", altText: "CSS" },
//   { imgUrl: "/logos/scss.svg", altText: "SCSS" },
//   { imgUrl: "/logos/webpack.svg", altText: "Webpack" },
//   { imgUrl: "/logos/figma.svg", altText: "Figma" },
// ];

// <div style={{ height: "600px", width: "100%", position: "relative" }}>
//             <LogoWall
//               items={skillsImgs}
//               direction="horizontal"
//               pauseOnHover={true}
//               size="clamp(8rem, 1rem + 20vmin, 25rem)"
//               duration="60s"
//               bgColor="#060606"
//               bgAccentColor="#111111"
//             />
//           </div>

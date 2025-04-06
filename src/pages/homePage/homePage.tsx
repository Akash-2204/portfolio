"use client";
import dynamic from "next/dynamic";
import styles from "./homePage.module.scss";
import { about } from "../../utils/userData";
import Image from "next/image";

const RotatingText = dynamic(
  () => import("@/components/Texts/rotateTexts/rotateTexts"),
  { ssr: false }
);
const AvatarModel = dynamic(
  () => import("@/components/avatarModel/avatarModel"),
  { ssr: false }
);
const GradientText = dynamic(
  () => import("@/components/Texts/gradientText/gradiantText"),
  { ssr: false }
);

export default function HomePage() {
  const socialLinks = [
    { src: "https://img.icons8.com/nolan/64/resume.png", alt: "Resume", url: about.resume },
    { src: "https://img.icons8.com/nolan/64/linkedin.png", alt: "LinkedIn", url: "https://www.linkedin.com/in/akash-thirumuruganantham/" },
    { src: "https://img.icons8.com/nolan/64/github.png", alt: "GitHub", url: "https://github.com/Akash-2204" },
    { src: "https://img.icons8.com/nolan/48/instagram-new--v1.png", alt: "Instagram", url: "https://www.instagram.com/akash_thirumuruganantham/" },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <AvatarModel />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.jobTitle3}>
            Hi there! I am
          </div>
          <GradientText
            className={styles.name}
            colors={["#ff007f", "#a200ff", "#007fff"]}
            animationSpeed={3}
            showBorder={false}
          >
            {about.name}
          </GradientText>
          <div className={styles.jobTitleSection}>
            <div className={styles.jobTitle1}>a</div>
            <RotatingText
              className={styles.jobTitle}
              texts={[
                "Full-stack Developer",
                "Frontend Developer",
                "Web Developer",
              ]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
            {/* <div className={styles.jobTitle1}>with 3+ years of Experience</div> */}
          </div>
          <div className={styles.jobTitle2}>
            Let’s connect and build something amazing together!
          </div>
          <div className={styles.socialContainer}>
            {socialLinks.map(({ src, alt, url }, index) => (
              <button
                key={index}
                onClick={() =>
                  window.open(url, "_blank", "noopener,noreferrer")
                }
                className={styles.socialButton}
              >
                <Image src={src} alt={alt} width={64} height={64} priority />
              </button>
            ))}
          </div>
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

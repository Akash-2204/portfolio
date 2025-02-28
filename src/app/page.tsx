import MagicCursor from "@/components/magicCursor/magicCursor";
import Experiences from "@/pages/Experiences/experiences";
import HomePage from "@/pages/homePage/homePage";
import styles from "./page.module.scss";
import "@fontsource/poppins"; // Poppins
import "@fontsource/inter"; // Inter
import "@fontsource/montserrat"; // Montserrat
import Projects from "@/pages/Projects/projects";
import Skills from "@/pages/Skills/skills";
import ContactInfo from "@/pages/contactInfo/contactInfo";

export default function Home() {
  return (
    <>
      <MagicCursor />
      <div id="home" className={styles.section}>
        <HomePage />
      </div>
      <div id="experiences" className={styles.section}>
        <Experiences />
      </div>
      <div id="projects" className={styles.section}>
        <Projects />
      </div>
      <div id="skills" className={styles.section}>
        <Skills />
      </div>
      <div id="contactMe" className={styles.section}>
        <ContactInfo/>
      </div>
    </>
  );
}

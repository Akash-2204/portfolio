import MagicCursor from "@/components/magicCursor/magicCursor";
import Experiences from "@/pages/Experiences/experiences";
import HomePage from "@/pages/homePage/homePage";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <MagicCursor />
      <div className={styles.section}>
        <HomePage />
      </div>
      <div className={styles.section}>
        <Experiences />
      </div>
    </>
  );
}

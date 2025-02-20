import MagicCursor from "@/components/magicCursor/magicCursor";
import Experiences from "@/pages/Experiences/experiences";
import HomePage from "@/pages/homePage/homePage";
import styles from "./page.module.scss";
import RollingGallery from "@/components/rollingCards/rollingCards";

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
      <div className={styles.section}>
        <RollingGallery autoplay={false} pauseOnHover={true} />
      </div>

    </>
  );
}

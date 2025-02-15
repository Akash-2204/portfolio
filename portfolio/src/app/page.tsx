
import MagicCursor from "@/components/magicCursor/magicCursor";
import Modal from "@/components/modal/modal";
import Experiences from "@/pages/Experiences/experiences";
import TimelineDemo, { AnimatedModalDemo } from "@/pages/Experiences/experiences";
import HomePage from "@/pages/homePage/homePage";

export default function Home() {
  return (
    <>
    <MagicCursor />
      <HomePage />
      {/* <TimelineDemo /> */}
      {/* <AnimatedModalDemo/> */}
      {/* <Modal/> */}
      <Experiences />


    </>
  );
}

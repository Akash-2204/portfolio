import Modal from "@/components/modal/modal";
import Experience from "@/components/modal/modal";

const experienceData = {
  company: "Google",
  role: "Senior Frontend Engineer",
  duration: "2023 - Present",
  description: "Creating More Complex Animations for Modals Framer Motion allows you to create more complex animations by combining multiple animation props and using variants. Variants are a way to predefine animation states and transitions, which can then be reused across multiple components or animations.  For instance, you can create a modal that slides in from the right and then slides out to the left when closed..",
};

export default function Experiences() {
  return (
    <main>
      <Modal {...experienceData} />
    </main>
  );
}

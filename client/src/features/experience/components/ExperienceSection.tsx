
import { motion } from "framer-motion";

import SectionWrapper from "../../../components/common/SectionWrapper";
import SectionHeading from "../../../components/common/SectionHeading";

import ExperienceTimeline from "./ExperienceTimeline";

const ExperienceSection = () => {
  return (
    <SectionWrapper
      id="experience"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          number="04"
          label="Git History"
          title="Professional Journey"
          command="$ git log --stat --oneline"
          description="A timeline of my professional experiences, learning opportunities and engineering journey."
        />
      </motion.div>

      <ExperienceTimeline />

    </SectionWrapper>
  );
};

export default ExperienceSection;

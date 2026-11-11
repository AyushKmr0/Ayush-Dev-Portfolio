import { motion } from "framer-motion";
import { GitCommitHorizontal } from "lucide-react";

import { experiences } from "../data/experience.data";
import ExperienceCard from "./ExperienceCard";

const ExperienceTimeline = () => (
  <div className="relative mx-auto max-w-6xl">
    <div className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100 md:left-1/2 md:-translate-x-1/2" />

    <div className="space-y-8 md:space-y-12">
      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className="relative grid grid-cols-[40px_minmax(0,1fr)] items-start gap-4 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:gap-5"
        >
          <motion.article
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className={`col-start-2 md:row-start-1 ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"}`}
          >
            <ExperienceCard experience={experience} />
          </motion.article>

          <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white text-blue-600 shadow-sm ring-4 ring-background">
              <GitCommitHorizontal size={19} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ExperienceTimeline;


import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import HeroContent from "./HeroContent";
import HeroCodePanel from "./HeroCodePanel";

const HomeHero = () => {
  return (
    <section
      id="home"
      className="
        relative mx-auto flex min-h-screen w-full max-w-[88rem]
        items-center overflow-hidden
        px-5 py-20 sm:px-8 lg:px-12
      "
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[80rem] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-12">

        <HeroContent />

        <div className="relative py-6 lg:py-8">
          <HeroCodePanel />
        </div>

      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-blue-600"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <ChevronDown size={25} />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute right-8 top-8 hidden font-mono text-xs tracking-wide text-blue-700 sm:block lg:right-12">
        &lt;System.Init /&gt;
      </div>

    </section>
  );
};

export default HomeHero;

import { motion } from "framer-motion";

import SectionWrapper from "../../../components/common/SectionWrapper";
import SectionHeading from "../../../components/common/SectionHeading";

import ProfileCard from "./ProfileCard";
import AboutTerminal from "./AboutTerminal";
import EducationCard from "./EducationCard";
import ProfileStats from "./ProfileStats";

const AboutSection = () => {
	return (
		<SectionWrapper id="about">
			<motion.div
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}>
				<SectionHeading
					number="02"
					label="About System"
					title="A Little About Me"
					command="# About.system"
					description="Get to know the developer behind the code, my background, interests and approach to engineering."
				/>
			</motion.div>

			<div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
				{/* Left column */}
				<motion.div
					initial={{ opacity: 0, x: -25 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="space-y-5">
					<ProfileCard />
					<ProfileStats />
				</motion.div>

				{/* Right column */}
				<motion.div
					initial={{ opacity: 0, x: 25 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="space-y-5">
					<AboutTerminal />
					<EducationCard />
				</motion.div>
			</div>
		</SectionWrapper>
	);
};

export default AboutSection;

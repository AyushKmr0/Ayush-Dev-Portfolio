import SectionWrapper from "../../../components/common/SectionWrapper";
import SectionHeading from "../../../components/common/SectionHeading";
import SkillsUniverse from "./SkillsUniverse";

const SkillsSection = () => {
	return (
		<SectionWrapper id="skills">
			<SectionHeading
				number="03"
				label="Technology Universe"
				title="My Technical Arsenal"
				command="# Skills.json"
				description="Technologies, frameworks and tools I use to build modern applications. Explore the interactive universe."
			/>

			<SkillsUniverse />
		</SectionWrapper>
	);
};

export default SkillsSection;

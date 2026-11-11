import { HomeHero } from "../features/home";
import { SkillsSection } from "../features/skills";
import { AboutSection } from "../features/about";
import { ExperienceSection } from "../features/experience";
import { ProjectsSection } from "../features/projects";
import { ContactSection } from "../features/contact";
import SystemFooter from "../components/common/SystemFooter";
import LandingIntro from "../components/common/LandingIntro";
import SwarmCursor from "../components/ui/animations/SwarmCursor";
import TargetCursor from "../components/ui/animations/TargetCursor";

const HomePage = () => {
    return (
        <>
            <div className="relative portfolio-content-zoom tracking-wider">
                <TargetCursor
                    targetSelector='div[class*="rounded-"][class*="border"], article, a, button'
                    spinDuration={1.2}
                    parallaxOn
                    hoverDuration={0.2}
                    size={16}
                    cornerSize={12}
                    thickness={3}
                    padding={8}
                    dotSize={0}
                    cursorColor="#ffffff"
                    cursorColorOnTarget="#ffffff"
                    blendMode="difference"
                    matchRadius
                    showLabel
                    clickEffect
                    hideDefaultCursor={false}
                />
                <SwarmCursor
                    color={"#3b82f6"}
                    count={400}
                    size={2.6}
                    spread={200}
                    speed={0.25}
                    swirl={0.6}
                    clickEffect="burst"
                    lightMode
                >
                    <HomeHero />
                </SwarmCursor>
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ExperienceSection />
                <ContactSection />
            </div>
            <SystemFooter />
            <LandingIntro />
        </>
    );
};

export default HomePage;

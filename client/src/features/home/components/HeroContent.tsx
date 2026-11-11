import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";

import Badge from "../../../components/ui/Badge";

const technologies = [
	"REACT",
	"TYPESCRIPT",
	"JAVASCRIPT",
	"NODE.JS",
	"MONGODB",
	"ASP.NET CORE",
];

const socialLinks = [
	{
		name: "GitHub",
		url: "https://github.com/AyushKmr0",
		icon: FaGithub,
	},
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/ayushkmr0",
		icon: FaLinkedinIn,
	},
	{
		name: "Resume",
		url: "https://drive.google.com/file/d/1jjN8yScyqzFKNyJsK7DDtuPyNZHBz_4H/view?usp=sharing",
		icon: SiGitbook,
	},
];

const HeroContent = () => {
	return (
		<div className="flex flex-col justify-center">
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<Badge dot className="hero-status">
					git init
				</Badge>
			</motion.div>

			<motion.h1
				initial={{ opacity: 0, y: 25 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.15 }}
				className="mt-5 flex flex-col text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
				<span>Hello, I&apos;m</span>
				<span className="bg-gradient-to-r from-orange-500 via-blue-500 to-sky-400 bg-clip-text text-transparent">
					Ayush Kumar
				</span>
				<span className="w-6 h-6 bg-blue-100 rounded-sm absolute left-70 top-22 animate-ping"></span>
				<span className="w-5 h-4 bg-orange-100 rounded-sm absolute left-60 top-20 animate-ping"></span>
				<span className="w-8 h-8 bg-blue-100 rounded-sm absolute left-60 top-0 animate-ping"></span>
				<span className="w-10 h-10 bg-orange-100 rounded-sm absolute left-80 top-10 animate-ping"></span>
			</motion.h1>

			<motion.h2
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.25 }}
				className="mt-4 text-lg font-semibold text-slate-700 sm:text-xl">
				<span className="font-mono font-normal text-orange-600">
					&lt;Software Developer /&gt;
				</span>{" "}
				Building modern applications.
			</motion.h2>

			<motion.p
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.35 }}
				className="mt-3 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
				I build modern web applications with a focus on clean
				architecture, scalable backend systems, and intuitive user
				experiences.
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.45 }}
				className="mt-6 flex flex-wrap gap-3">
				{socialLinks.map((link) => {
					const Icon = link.icon;

					return (
						<a
							key={link.name}
							href={link.url}
							target={
								link.name === "Email" ? undefined : "_blank"
							}
							rel={
								link.name === "Email"
									? undefined
									: "noopener noreferrer"
							}
							aria-label={`Visit my ${link.name}`}
							className="
                group relative inline-flex w-[150px]
                items-center justify-center
                hero-action-primary p-[2px]
                shrink-0 transition-transform duration-400 hover:scale-102
                hover:bg-orange-400 
            ">
							<span
								className="
                    flex h-full w-full items-center justify-center gap-3
                    text-orange-600
                    hero-action-btn
                    transition-colors duration-300
                ">
								<Icon
									size={35}
									aria-hidden="true"
									className="shrink-0 transition-transform duration-300 group-hover:scale-110"
								/>

								<span className="text-base font-bold tracking-wide ">
									{link.name}
								</span>
							</span>
						</a>
					);
				})}
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.7 }}
				className="mt-7 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500 sm:gap-2.5">
				<span className="mr-1">LOADED_MODULES:</span>
				{technologies.map((technology) => (
					<span
						key={technology}
						className="rounded border border-orange-200 bg-orange-50 px-2 py-1 text-orange-700">
						{technology}
					</span>
				))}
			</motion.div>
		</div>
	);
};

export default HeroContent;

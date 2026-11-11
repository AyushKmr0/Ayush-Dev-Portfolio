import type {
	AboutProfile,
	Education,
  socialLink,
} from "../types/about.types";

import {
    FaGithub,
    FaLinkedinIn,
    FaTwitter,
    FaAt,
    FaMapMarkerAlt,
} from "react-icons/fa";

export const aboutProfile: AboutProfile = {
	about: {
		name: "Ayush Kumar",
		avatar: "https://avatars.githubusercontent.com/u/165952944?v=4",
		role: "Software Developer",
		qualification: "MCA Graduate",
		location: "Bengaluru, India",
	},

	introduction:
		"I'm a software developer and MCA graduate interested in building modern web applications. I enjoy working across frontend and backend technologies, designing clean APIs, and understanding how scalable applications are engineered.",

	interests: [
		"Full Stack Development",
		"Backend Engineering",
		"System Design",
		"Database Architecture",
		"Problem Solving",
	],
};

export const education: Education[] = [
	{
		id: "mca",
		degree: "Master of Computer Applications",
		institution: "Rungta College of Engineering and Technology",
		location: "Bhilai, Chhattisgarh",
		status: "Completed",
	},
	{
		id: "bsc",
		degree: "B.Sc. in Computer Applications",
		institution: "Dr. Shyama Prasad Mukherjee University",
		location: "Ranchi, Jharkhand",
		status: "Completed",
	},
];

export const socialLinks: socialLink[] = [
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
        name: "Twitter X",
        url: "https://x.com/AyushKmr_",
        icon: FaTwitter,
    },
    {
        name: "Email",
        url: "mailto:ayushkmr0.dev@gmail.com",
        icon: FaAt,
    },
    {
        name: "Location",
        detail: "Bengaluru, Karnataka, India",
        url: "https://t3.ftcdn.net/jpg/10/90/28/10/360_F_1090281086_J2r6695zvrWmzdOREo7P2VGVs7ElxEYp.jpg",
        icon: FaMapMarkerAlt,
    },
];

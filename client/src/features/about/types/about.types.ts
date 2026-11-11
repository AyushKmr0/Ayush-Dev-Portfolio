import type { IconType } from "react-icons/lib";

export interface Education {
	id: string;
	degree: string;
	institution: string;
	location: string;
	status: string;
}

export interface socialLink {
	name: string;
	url: string;
	icon: IconType;
  detail?: string;
}

export interface About {
	name: string;
	avatar: string;
	role: string;
	qualification: string;
	location: string;
}

export interface AboutProfile {
	about: About;
	introduction: string;
	interests: string[];
}

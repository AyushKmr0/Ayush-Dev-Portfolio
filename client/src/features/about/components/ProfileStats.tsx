import { useState } from "react";
import { socialLinks } from "../data/about.data";
import SpecularButton from "@/components/ui/animations/SpecularButton";

const ProfileStats = () => {
	const [activeCard, setActiveCard] = useState<string | null>(null);

	return (
		<div className="grid grid-cols-2 gap-3">
			{socialLinks.map((link, idx) => {
				const Icon = link.icon;
				const isLocation = link.name.toLowerCase() === "location";

				return !isLocation ? (
					<SpecularButton
						key={link.name}
						size="lg"
						className="min-h-20 w-full flex-col gap-3"
						radius={18}
						tint="#ffffff"
						tintOpacity={0.92}
						textColor="#000000"
						lineColor="#1447e6"
						baseColor="#94a3b8"
						intensity={0.75}
						idleIntensity={0.35}
						shineSize={24}
						shineFade={34}
						thickness={0.5}
						glow={1.2}
						followMouse
						proximity={250}
						speed={0.45}
						autoAnimate
						onClick={() => {
							if (link.url.startsWith("mailto:")) {
								window.location.href = link.url;
							} else {
								window.open(
									link.url,
									"_blank",
									"noopener,noreferrer",
								);
							}
						}}>
						<Icon className="text-4xl" />
						<span>{link.name}</span>
					</SpecularButton>
				) : (
					<div
						key={link.name}
						onClick={() =>
							setActiveCard((prev) =>
								prev === link.name ? null : link.name,
							)
						}
						className={`group relative isolate flex min-h-44 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-blue-100 bg-white font-extrabold text-center uppercase tracking-widest text-blue-600 shadow-(--shadow-blue-hover) transition hover:-translate-y-[1px] hover:shadow-md hover:text-white ${
							socialLinks.length % 2 !== 0 &&
							idx === socialLinks.length - 1
								? "col-span-2"
								: ""
						} ${activeCard === link.name ? "text-white" : ""}`}>
						<img
							src={link.url}
							alt=""
							aria-hidden="true"
							className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ${
								activeCard === link.name
									? "opacity-70"
									: "opacity-10 group-hover:opacity-70"
							}`}
						/>

						<div className="relative z-10 flex w-full flex-col items-center justify-center gap-2">
							<span>
								<Icon className="text-3xl" />
							</span>

							<a
								href={link.url}
								className=" text-[14px] sm:text-[12px]">
								{link.name}
							</a>

							<p className="text-[10px] sm:text-[10px]">
								{link.detail}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ProfileStats;

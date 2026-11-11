import { aboutProfile } from "../data/about.data";

const ProfileCard = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-(--shadow-multi-secondary) ">
			<div className="flex items-center">
				<div className="relative w-75 h-75 rounded-full p-2 ">
					<div className="absolute w-75 h-75 rounded-full border-l-6 border-l-orange-600 border-y-2 border-y-transparent top-0 left-0 animate-spin" />

					<div className="absolute w-70 h-70 rounded-full border-t-4 border-t-blue-600 border-b-4 border-b-blue-600 border-x-2 border-x-transparent top-2.5 left-2.5 animate-spin" />

					<img
						src={aboutProfile.about.avatar}
						alt="Ayush-avatar"
						className="rounded-full p-4 hover:shadow-(--shadow-multi-secondary)"
					/>
					<span className="w-6 h-6 bg-blue-100 rounded-sm absolute left-0 top-10 animate-ping"></span>
					<span className="w-5 h-4 bg-orange-100 rounded-sm absolute left-6 top-20 animate-ping"></span>
					<span className="w-8 h-8 bg-blue-100 rounded-sm absolute left-0 top-40 animate-ping"></span>
					<span className="w-10 h-10 bg-orange-100 rounded-sm absolute left-5 top-60 animate-ping"></span>
				</div>
			</div>

			<div className="w-full p-2 uppercase text-xs tracking-wider">
				{Object.entries(aboutProfile.about)
					.filter(([key]) => key !== "avatar")
					.map(([key, value], idx, entries) => {
						return (
							<div
								key={key}
								className={`w-full flex items-center justify-between border-b border-b-slate-200 ${idx === entries.length - 1 ? "border-none" : ""} py-2 `}>
								<span className="text-slate-500 pl-4">
									{key === "name" ? "admin" : key}
								</span>
								<h3
									className={`pr-4 font-semibold ${key === "name" ? "text-orange-600" : key === "role" ? "text-blue-600" : key === "location" ? "text-green-600" : "text-slate-700"}`}>
									{value}
								</h3>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default ProfileCard;

import { Outlet } from "react-router-dom";

import SideNavigation from "./SideNavigation";

const AppLayout = () => {
	return (
		<div className="portfolio-grid min-h-screen text-text-primary">
			<main>
				<Outlet />
			</main>

			<SideNavigation />
		</div>
	);
};

export default AppLayout;

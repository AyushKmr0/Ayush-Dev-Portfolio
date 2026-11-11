import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
			<h1 className="text-8xl font-bold text-blue-600">404</h1>

			<p className="mt-4 text-xl font-semibold">Page Not Found</p>

			<p className="mt-2 text-slate-500">
				The requested resource could not be found.
			</p>

			<Link
				to="/"
				className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
				Back to Home
			</Link>
		</section>
	);
};

export default NotFoundPage;

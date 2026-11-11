import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";
import MotionProvider from "./components/common/MotionProvider";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<MotionProvider>
				<App />
			</MotionProvider>
		</Provider>
	</React.StrictMode>,
);

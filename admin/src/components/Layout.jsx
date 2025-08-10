// src/components/Layout.jsx
import React from "react";
import backgroundImage from "../assets/logofinal.png";

const Layout = ({ children }) => {
	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Blurred background */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: "40% auto", // Reduce logo size
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					filter: "blur(1.2px)",
				}}
			/>
			{/* Overlay to dim the blur if needed */}
			<div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
			{/* Foreground content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
};

export default Layout;

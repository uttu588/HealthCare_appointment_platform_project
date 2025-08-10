import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import logofinal from "../assets/logofinal.png";

const Navbar = () => {
	const { dToken, setDToken } = useContext(DoctorContext);
	const { aToken, setAToken } = useContext(AdminContext);

	const navigate = useNavigate();

	const logout = () => {
		navigate("/");
		dToken && setDToken("");
		dToken && localStorage.removeItem("dToken");
		aToken && setAToken("");
		aToken && localStorage.removeItem("aToken");
	};

	return (
		<div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
			<div className="flex items-center gap-5 text-xs">
				<img
					onClick={() => navigate("/")}
					className="w-32 cursor-pointer hover:bg-white hover:scale-125  transition-all duration-300 "
					src={logofinal}
					alt="Welcome to SkiCare Medical & Diagnostic"
				/>
				<p className="border px-4 py-1 rounded-full border-gray-500 text-gray-600">
					{aToken ? "Admin" : "Doctor"}
				</p>
			</div>
			<button
				onClick={() => logout()}
				className="bg-primary text-white text-sm px-10 py-2 rounded-full"
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;

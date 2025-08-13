import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#5c5c5c] to-[#1c1c1c] rounded-lg px-6 md:px-10 lg:px-20 py-0 mt-2 ">
			{/* --------- Header Left --------- */}
			<div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
				<p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
					Book Appointment <br /> With Trusted Doctors
				</p>
				<div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
					<img
						className="w-28"
						src={assets.group_profiles}
						alt=""
					/>
					<p className="text-base">
						Simply browse through our extensive list of trusted doctors,
						<br className="hidden sm:block" /> schedule your appointment
						hassle-free.
					</p>
				</div>
				<a
					href="#speciality"
					className="flex items-center gap-2 bg-white px-10 py-2 rounded-full text-[#595959] text-lg m-auto md:m-0 hover:scale-90 transition-all duration-300 hover:bg-orange-400 hover:border-r-gray-950 hover:text-2xl hover:text-indigo-600 cursor-pointer"
				>
					Book appointment
					<img
						className="w-3"
						src={assets.arrow_icon}
						alt=""
					/>
				</a>
				{/* Emergency button right-aligned, before login/profile, only on home page */}
				{location.pathname === "/" && (
					<NavLink
						to="/emergency"
						className="block ml-0 md:ml-4 w-full md:w-auto"
					>
						<div className="flex items-center justify-center gap-2 py-2 px-8 md:px-10 rounded-full text-base md:text-lg m-auto md:m-0 text-red-700 font-bold pulse-emergency shadow-lg hover:text-primary transition duration-300 hover:bg-white hover:border-r-gray-950 hover:text-2xl hover:scale-100 cursor-pointer w-full md:w-auto">
							EMERGENCY
						</div>
					</NavLink>
				)}
			</div>

			{/* --------- Header Right --------- */}
			<div className="md:w-1/2 relative">
				<img
					className="w-full md:absolute bottom-0 h-auto rounded-lg"
					src={assets.header_img}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Header;

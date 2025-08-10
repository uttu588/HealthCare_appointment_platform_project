import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
	const navigate = useNavigate();

	return (
		<div className="md:mx-10">
			<div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
				{/* Logo and description */}
				<div>
					<img
						className="mb-5 h-30 w-80"
						src={assets.logofinal}
						alt="SkiCare Logo"
					/>
					<p className="w-full md:w-2/3 text-gray-800 text-base leading-6">
						SkiCare Medical & Diagnostic is a state-of-the-art facility
						dedicated to providing comprehensive healthcare services with
						compassion and expertise. Our team of skilled professionals is
						committed to delivering personalized care tailored to each patient's
						needs. At SkiCare, we prioritize your well-being, ensuring a
						harmonious journey towards optimal health and wellness.
					</p>
				</div>

				{/* Company links */}
				<div>
					<p className="text-xl font-medium mb-5">COMPANY</p>
					<ul className="flex flex-col gap-3 text-gray-800 text-base">
						<li
							onClick={() => {
								navigate("/");
								window.scrollTo(0, 0);
							}}
							className="cursor-pointer hover:text-primary"
						>
							Home
						</li>

						<li
							onClick={() => {
								navigate("/about");
								window.scrollTo(0, 0);
							}}
							className="cursor-pointer hover:text-primary"
						>
							About us
						</li>

						<li className="cursor-pointer hover:text-primary">Delivery</li>
						<li className="cursor-pointer hover:text-primary">
							Privacy policy
						</li>
					</ul>
				</div>

				{/* Contact Info */}
				<div>
					<p className="text-xl font-medium mb-5">GET IN TOUCH</p>
					<ul className="flex flex-col gap-3 text-gray-800 text-base">
						<li>+91-9060393416</li>
						<li>Ritikumar98765@gmail.com</li>
					</ul>
				</div>
			</div>

			{/* Footer bottom */}
			<div>
				<hr />
				<p className="py-5 text-sm text-center font-bold text-violet-700">
					Copyright 2025 @ SkiCare.com - All Right Reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;

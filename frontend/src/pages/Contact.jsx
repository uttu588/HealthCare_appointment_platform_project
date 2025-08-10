// import React from "react";
// import { assets } from "../assets/assets";

// const Contact = () => {
// 	return (
// 		<div>
// 			<div className="text-center text-2xl pt-10 text-[#707070]">
// 				<p className="text-primary font-medium">
// 					CONTACT <span className="text-gray-700 font-semibold">US</span>
// 				</p>
// 			</div>

// 			<div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
// 				<img
// 					className="w-full md:max-w-[360px]"
// 					src={assets.contact_image}
// 					alt=""
// 				/>
// 				<div className="flex flex-col justify-center items-start gap-6">
// 					<p className=" font-semibold text-lg text-gray-600">OUR OFFICE</p>
// 					<p className=" text-gray-500">
// 						Housing Board Colony, Kankarbagh,near Patliputra Sports Complex{" "}
// 						<br />
// 						Patna - 800020, Bihar, INDIA , ASIA
// 					</p>

// 					{/* <p className=" text-gray-500">
// 						Tel: (415) 555-0132 <br />
// 						Ph No: +91 9060393416 <br />
// 						WhatsApp: +91 7808865011 <br />
// 						Facebook : https://www.facebook.com/profile.php?id=100051752360133<br />
// 						Instagram: <br/>LinkedIn:https://www.linkedin.com/in/ritik-kumar-801179250/
// 						<br /> Email: Ritikumar9876@gmail.com
// 					</p> */}

// 					<p className=" font-semibold text-lg text-gray-600">
// 						CAREERS AT SkiCare
// 					</p>
// 					<p className=" text-gray-500">
// 						Learn more about our teams and job openings.
// 					</p>
// 					<button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
// 						Explore Jobs
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Contact;

import React from "react";
import { assets } from "../assets/assets";
import {
	FaPhoneAlt,
	FaWhatsapp,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
	return (
		<div>
			<div className="text-center text-2xl pt-10 text-[#707070] ">
				<p className="text-primary font-medium">
					CONTACT <span className="text-gray-700 font-semibold">US</span>
				</p>
			</div>

			<div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm md:mx-10">
				<img
					className="w-full md:max-w-[360px]"
					src={assets.contact_image}
					alt=""
				/>

				<div className="flex flex-col justify-center items-start gap-6">
					<p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
					<p className="text-black ">
						Housing Board Colony, Kankarbagh, near Patliputra Sports Complex
						<br />
						Patna - 800020, Bihar, INDIA , ASIA
					</p>

					{/* Contact Links with Icons */}
					<div className="text-black space-y-2 text-sm">
						<a
							href="tel:+14155550132"
							className="flex items-center gap-2 hover:underline"
						>
							<FaPhoneAlt className="text-primary" /> Tel: (415) 555-0132
						</a>
						<a
							href="tel:+919060393416"
							className="flex items-center gap-2 hover:underline"
						>
							<FaPhoneAlt className="text-primary" /> Ph No: +91 9060393416
						</a>
						<a
							href="https://wa.me/917808865011"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 hover:underline"
						>
							<FaWhatsapp className="text-green-500" /> WhatsApp: +91 7808865011
						</a>
						<a
							href="https://www.facebook.com/profile.php?id=100051752360133"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 hover:underline"
						>
							<FaFacebook className="text-blue-600" /> Facebook
						</a>
						<a
							href="https://www.instagram.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 hover:underline"
						>
							<FaInstagram className="text-pink-500" /> Instagram
						</a>
						<a
							href="https://www.linkedin.com/in/ritik-kumar-801179250/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 hover:underline"
						>
							<FaLinkedin className="text-blue-700" /> LinkedIn
						</a>
						<a
							href="mailto:Ritikumar9876@gmail.com"
							className="flex items-center gap-2 hover:underline"
						>
							<FaEnvelope className="text-red-500" /> Email:
							Ritikumar9876@gmail.com
						</a>
					</div>

					<p className="font-semibold text-lg text-gray-600 mt-6">
						CAREERS AT SkiCare
					</p>
					<p className="text-gray-900">
						Learn more about our teams and job openings.
					</p>
					<button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
						Explore Jobs
					</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;

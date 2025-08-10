import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
	const navigate = useNavigate();

	const { doctors } = useContext(AppContext);

	return (
		<div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
			<h1 className="text-3xl font-bold">Top Doctors to Book</h1>
			<p className="sm:w-1/3 text-center text-base">
				Simply browse through our extensive list of trusted doctors.
			</p>
			<div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
				{doctors.slice(0, 10).map((item, index) => (
					<div
						onClick={() => {
							navigate(`/appointment/${item._id}`);
							scrollTo(0, 0);
						}}
						key={index}
						className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border border-gray-100 cursor-pointer hover:scale-105 transition duration-300"
					>
						<img
							src={item.image}
							alt={item.name}
							className="w-20 h-20 rounded-full object-cover mb-2 bg-[#EAEFFF]"
						/>
						<h4 className="font-bold text-lg mb-1 text-center">{item.name}</h4>
						<div className="text-primary text-sm mb-1 text-center">
							{item.speciality}
						</div>
						<div className="text-gray-500 text-xs mb-1 text-center">
							{item.degree} | {item.experience}
						</div>
						<div className="text-gray-400 text-xs mb-1 text-center">
							{item.address?.line1}, {item.address?.line2}
						</div>
						<span
							className={`font-semibold text-xs ${
								item.available ? "text-green-600" : "text-red-500"
							}`}
						>
							{item.available ? "Available" : "Not Available"}
						</span>
					</div>
				))}
			</div>
			<button
				onClick={() => {
					navigate("/doctors");
					scrollTo(0, 0);
				}}
				// className="bg-orange-300 text-indigo-600 px-8 py-2 rounded-full font-extrabold hidden text-lg md:block transition duration-300 hover:bg-primary hover:text-xl hover:text-black cursor-pointer hover:scale-105"
				className="bg-orange-300 text-indigo-600 px-8 py-2 rounded-full font-extrabold text-lg block md:block transition duration-300 hover:bg-primary hover:text-xl hover:text-black cursor-pointer hover:scale-105"
			>
				more
			</button>
		</div>
	);
};

export default TopDoctors;

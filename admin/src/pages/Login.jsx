import axios from "axios";
import { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const Login = () => {
	const [state, setState] = useState("Admin");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const { setDToken } = useContext(DoctorContext);
	const { setAToken } = useContext(AdminContext);

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const endpoint =
				state === "Admin" ? "/api/admin/login" : "/api/doctor/login";

			const { data } = await axios.post(backendUrl + endpoint, {
				email,
				password,
			});

			if (data.success) {
				if (state === "Admin") {
					setAToken(data.token);
					localStorage.setItem("aToken", data.token);
				} else {
					setDToken(data.token);
					localStorage.setItem("dToken", data.token);
				}
				toast.success("Login successful!");
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			toast.error("Login failed. Please try again.");
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<form
				onSubmit={onSubmitHandler}
				className="relative z-10 bg-orange-400 bg-opacity-10 backdrop-blur-md flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg"
			>
				<p className="text-3xl font-bold m-auto text-primary">
					<span className="text-primary">{state}</span> Login
				</p>

				{/* Email input */}
				<div className="w-full text-xl text-amber-900 font-semibold">
					<p>Email</p>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className="border border-[#260b0b] rounded w-full p-2 mt-1 bg-white bg-opacity-20  text-black"
						type="email"
						required
					/>
				</div>

				{/* Password input */}
				<div className="w-full text-xl text-amber-900 font-semibold">
					<p>Password</p>
					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className="border border-[#260b0b] rounded w-full p-2 mt-1 bg-white bg-opacity-20 text-black"
						type="password"
						required
					/>
				</div>

				{/* Submit button */}
				<button className="bg-primary bg-opacity-75 text-white w-full py-2 rounded-md text-lg font-semibold">
					Click to Login
				</button>

				{/* Toggle login type */}
				{state === "Admin" ? (
					<p className="w-full text-xl text-red-950 font-semibold">
						Doctor Login?{" "}
						<span
							onClick={() => setState("Doctor")}
							className="text-primary underline cursor-pointer"
						>
							Click here
						</span>
					</p>
				) : (
					<p className="w-full text-xl text-lime-950 font-semibold">
						Admin Login?{" "}
						<span
							onClick={() => setState("Admin")}
							className="text-primary underline cursor-pointer"
						>
							Click here
						</span>
					</p>
				)}
			</form>
		</div>
	);
};

export default Login;

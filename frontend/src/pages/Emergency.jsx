import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { doctors as allDoctors } from "../assets/assets";

function getRandomDoctor(availableDoctors) {
	const idx = Math.floor(Math.random() * availableDoctors.length);
	return availableDoctors[idx];
}

// Dummy function to simulate sending message/email
function sendNotification({ to, message }) {
	// In real app, call backend API to send SMS/email
	console.log(`Sending to ${to}: ${message}`);
}

// Generate a dummy Google Meet link
function generateMeetLink() {
	const random = Math.random().toString(36).substring(2, 10);
	return `https://meet.google.com/${random}`;
}

function Emergency() {
	const { userData, token } = useContext(AppContext);
	const [appointment, setAppointment] = useState(null);
	const [popup, setPopup] = useState(false);

	// In emergency, all doctors are considered available
	const availableDoctors = allDoctors;

	const handleBookAppointment = () => {
		if (!userData || !token) {
			alert(
				"You must be logged in as a patient to book an emergency appointment."
			);
			return;
		}
		if (availableDoctors.length === 0) {
			alert("No doctors are currently available for emergency appointments.");
			return;
		}
		const doctor = getRandomDoctor(availableDoctors);
		const meetLink = generateMeetLink();

		// Simulate sending notifications (replace with real API calls)
		const message = `Appointment booked!\nDoctor: ${doctor.name}\nMeet Link (active in 1 min): ${meetLink}`;
		sendNotification({
			to: doctor.email,
			message: `New appointment with ${userData.name}. Meet Link: ${meetLink}`,
		});
		sendNotification({ to: userData.email, message });

		setAppointment({
			doctor,
			meetLink,
		});
		setPopup(true);

		// Optionally, activate the meet link after 1 minute (simulate)
		setTimeout(() => {
			// In real app, update meet link status in backend
			console.log("Meet link is now active:", meetLink);
		}, 60000);
	};

	return (
		<div className="px-2 py-8 md:px-8 max-w-6xl mx-auto">
			<h2 className="text-3xl font-bold mb-6 text-center text-primary">
				Emergency Appointment
			</h2>
			{!userData || !token ? (
				<p className="text-red-600 font-bold mb-6 text-center">
					Please log in as a patient to book an emergency appointment.
				</p>
			) : null}

			<h3 className="text-xl font-semibold mb-4">
				Available Doctors (Emergency Only)
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
				{availableDoctors.length === 0 ? (
					<p className="text-gray-500 col-span-full">
						No doctors are currently available for emergency appointments.
					</p>
				) : (
					availableDoctors.map((doc) => (
						<div
							key={doc._id}
							className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border border-gray-100"
						>
							<img
								src={doc.image}
								alt={doc.name}
								className="w-20 h-20 rounded-full object-cover mb-2"
							/>
							<h4 className="font-bold text-lg mb-1 text-center">{doc.name}</h4>
							<div className="text-primary text-sm mb-1 text-center">
								{doc.speciality}
							</div>
							<div className="text-gray-500 text-xs mb-1 text-center">
								{doc.degree} | {doc.experience}
							</div>
							<div className="text-gray-400 text-xs mb-1 text-center">
								{doc.address.line1}, {doc.address.line2}
							</div>
							<span className="text-green-600 font-semibold text-xs">
								Available (Emergency)
							</span>
						</div>
					))
				)}
			</div>

			<button
				onClick={handleBookAppointment}
				className="block mx-auto bg-primary text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={!userData || !token || availableDoctors.length === 0}
			>
				Book Appointment
			</button>

			{popup && appointment && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white p-8 rounded-lg min-w-[320px] text-center shadow-lg">
						<h3 className="text-2xl font-bold mb-4 text-primary">
							Appointment Booked!
						</h3>
						<p className="mb-2">
							<strong>Doctor:</strong> {appointment.doctor.name}
							<br />
							<strong>Email:</strong> {appointment.doctor.email}
							<br />
							<strong>Meet Link:</strong>{" "}
							<a
								href={appointment.meetLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 underline break-all"
							>
								{appointment.meetLink}
							</a>
							<br />
							<small className="text-gray-500">
								(Link will be active in 1 minute)
							</small>
						</p>
						<button
							onClick={() => setPopup(false)}
							className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 transition"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Emergency;

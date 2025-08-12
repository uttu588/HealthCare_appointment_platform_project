import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import NewsTicker from "../components/NewsTicker";

const Home = () => {
	const messages = [
		"🚨 Breaking News: Appointment booking closes at 5 PM today!",
		"📢 New doctors have joined our team!",
		"💡 Stay healthy and hydrated!",
		"🩺 Free health checkup camp next Sunday!",
	];
	const speed = 60;
	return (
		<div>
			<NewsTicker
				messages={messages}
				speed={speed}
			/>
			<Header />
			<SpecialityMenu />
			<TopDoctors />
			<Banner />
		</div>
	);
};

export default Home;

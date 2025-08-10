import { useEffect, useState } from "react";
import axios from "axios";

const SlotBookingCounter = ({ docId, slotDate, slotTime, refreshKey }) => {
	const [count, setCount] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!docId || !slotDate || !slotTime) return;
		setLoading(true);
		axios
			.get(`/api/user/slot-booking-count`, {
				params: { docId, slotDate, slotTime },
			})
			.then((res) => {
				setCount(res.data.count ?? 0);
				setLoading(false);
			})
			.catch(() => {
				setCount(0);
				setLoading(false);
			});
	}, [docId, slotDate, slotTime, refreshKey]);

	if (loading) {
		return (
			<div className="text-xs text-gray-400 mt-1 text-center">Loading...</div>
		);
	}

	return (
		<div className="text-xs text-gray-500 mt-1 text-center">
			{count} patient{count === 1 ? "" : "s"} booked this slot
		</div>
	);
};

export default SlotBookingCounter;

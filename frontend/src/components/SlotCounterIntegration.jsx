import SlotBookingCounter from "./SlotBookingCounter";

export function SlotCounterIntegration({ docId, slotDate, slotTime }) {
	return (
		<SlotBookingCounter
			docId={docId}
			slotDate={slotDate}
			slotTime={slotTime}
		/>
	);
}

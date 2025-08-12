import React from "react";
import PropTypes from "prop-types";

const NewsTicker = ({ messages, speed = 60 }) => {
	return (
		<div className="overflow-hidden bg-[#e6dc86] rounded-xl text-black border border-[#040e17] hover:text-primary whitespace-nowrap max-w-full">
			<div
				className="inline-block animate-ticker text-xl md:text-xl lg:text-2xl"
				style={{ animationDuration: `${speed}s`, minWidth: "250vw" }}
			>
				{messages.map((msg, index) => (
					<span
						key={index}
						className="inline-block mx-6 md:mx-10 lg:mx-16"
					>
						{msg} <span className="mx-1 md:mx-2 lg:mx-3">|</span>
					</span>
				))}
			</div>
		</div>
	);
};

NewsTicker.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.string).isRequired,
	speed: PropTypes.number,
};

export default NewsTicker;

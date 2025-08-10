// import { useState } from "react";

// const Chatbot = () => {
// 	const [messages, setMessages] = useState([
// 		{
// 			sender: "bot",
// 			text: "👩‍⚕️ Hello! I am Satakshi, your Patient Care Coordinator AI Agent. I can help you with appointment info, collect your health details, and answer health-related questions.\n\nFor example, you can ask:\n- How do I book an appointment?\n- What should I do if I have a fever?\n- Can you help me find a specialist?\n\nHow can I assist you today?",
// 		},
// 	]);
// 	const [input, setInput] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const handleSend = async (e) => {
// 		e.preventDefault();
// 		if (!input.trim()) return;
// 		const userMsg = { sender: "user", text: input };
// 		setMessages((msgs) => [...msgs, userMsg]);
// 		setLoading(true);
// 		setInput("");

// 		// Example: Use OpenAI ChatGPT API (replace with your own key and endpoint)
// 		try {
// 			// Google Gemini API endpoint and key (replace with your own key)
// 			const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // <-- Replace with your Gemini API key
// 			const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
// 			// Gemini expects a single prompt string, so concatenate the conversation
// 			const systemPrompt =
// 				"You are a Patient Care Coordinator AI Agent. Collect patient details and answer health-related questions in a friendly, professional manner. Always ask for relevant details if needed (e.g., age, symptoms, duration, etc.).";
// 			const history = messages
// 				.map((m) => `${m.sender === "user" ? "User" : "AI"}: ${m.text}`)
// 				.join("\n");
// 			const prompt = `${systemPrompt}\n${history}\nUser: ${input}\nAI:`;
// 			const res = await fetch(endpoint, {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					contents: [{ parts: [{ text: prompt }] }],
// 				}),
// 			});
// 			const data = await res.json();
// 			// Gemini's response is in data.candidates[0].content.parts[0].text
// 			const botMsg =
// 				data.candidates?.[0]?.content?.parts?.[0]?.text ||
// 				"Sorry, I couldn't understand that.";
// 			setMessages((msgs) => [...msgs, { sender: "bot", text: botMsg }]);
// 		} catch (err) {
// 			setMessages((msgs) => [
// 				...msgs,
// 				{ sender: "bot", text: "Error connecting to AI." },
// 			]);
// 		}
// 		setLoading(false);
// 	};

// 	return (
// 		<div className="flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl border border-blue-200 mx-auto w-full max-w-[500px] min-w-[260px] min-h-[540px] max-h-[700px] h-[70vh] sm:h-[80vh] relative overflow-hidden">
// 			{/* Header */}
// 			<div className="flex items-center gap-3 px-5 pt-5 pb-3 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white shadow-md rounded-t-3xl">
// 				<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border-2 border-blue-200">
// 					<span className="text-3xl">👩‍⚕️</span>
// 				</div>
// 				<div className="flex flex-col">
// 					<span className="font-bold text-lg tracking-wide drop-shadow">
// 						Patient Care Coordinator
// 					</span>
// 					<span className="text-xs text-blue-100/90 mt-0.5">
// 						AI Healthcare Assistant
// 					</span>
// 				</div>
// 			</div>

// 			{/* Chat Area */}
// 			<div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-blue-50/40">
// 				{messages.map((msg, idx) => (
// 					<div
// 						key={idx}
// 						className={`text-sm px-4 py-2 rounded-2xl max-w-[85%] break-words whitespace-pre-line shadow-sm transition-all duration-200 ${
// 							msg.sender === "user"
// 								? "bg-gradient-to-br from-blue-200 to-blue-100 ml-auto text-right border border-blue-300"
// 								: "bg-white text-left border border-blue-100"
// 						}`}
// 					>
// 						{msg.text}
// 					</div>
// 				))}
// 				{loading && (
// 					<div className="text-xs text-blue-400 animate-pulse">
// 						Bot is typing...
// 					</div>
// 				)}
// 			</div>

// 			{/* Input Area */}
// 			<form
// 				onSubmit={handleSend}
// 				className="flex border-t p-3 gap-2 bg-gradient-to-r from-blue-100/60 to-blue-50/80"
// 			>
// 				<input
// 					type="text"
// 					className="flex-1 border border-blue-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-inner transition-all duration-200 resize-none max-h-12 min-h-0 overflow-y-auto"
// 					value={input}
// 					onChange={(e) => setInput(e.target.value)}
// 					placeholder="Type your message..."
// 					disabled={loading}
// 				/>
// 				<button
// 					type="submit"
// 					className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-2 rounded-full shadow-md font-semibold hover:from-blue-600 hover:to-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// 					disabled={loading || !input.trim()}
// 				>
// 					Send
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default Chatbot;

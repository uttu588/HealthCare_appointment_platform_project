import { useState } from "react";

import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
// Vite automatically handles pdfjs worker, so no manual workerSrc assignment needed

const GEMINI_API_KEY = "AIzaSyAw1nwVAMQl86mvZxAUg3Ybe3EefQqGvIw"; // Replace with your actual Gemini API key
const GEMINI_API_URL =
	"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const PrescriptionSummary = () => {
	const [summary, setSummary] = useState("");
	const [loading, setLoading] = useState(false);
	const [fileName, setFileName] = useState("");

	// Helper to extract text from file (supports text, image, PDF)
	const extractTextFromFile = async (file) => {
		if (file.type.startsWith("text")) {
			return await file.text();
		}
		if (file.type === "application/pdf") {
			// PDF extraction
			const arrayBuffer = await file.arrayBuffer();
			const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
			let text = "";
			for (let i = 1; i <= pdf.numPages; i++) {
				const page = await pdf.getPage(i);
				const content = await page.getTextContent();
				text += content.items.map((item) => item.str).join(" ");
			}
			return text;
		}
		if (file.type.startsWith("image")) {
			// OCR for images
			const {
				data: { text },
			} = await Tesseract.recognize(file, "eng");
			return text;
		}
		return "[File type not supported for direct text extraction]";
	};

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setFileName(file.name);
		setLoading(true);
		const fileText = await extractTextFromFile(file);
		// Gemini API call
		try {
			const response = await fetch(GEMINI_API_URL + `?key=${GEMINI_API_KEY}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [{ text: `Summarize this prescription: ${fileText}` }],
						},
					],
				}),
			});
			const data = await response.json();
			// Parse Gemini response
			const geminiSummary =
				data?.candidates?.[0]?.content?.parts?.[0]?.text ||
				"No summary returned.";
			setSummary(geminiSummary);
		} catch (err) {
			setSummary("Error fetching summary from Gemini API.");
		}
		setLoading(false);
	};

	return (
		<div className="w-full md:w-1/2 mt-10 md:mt-0 flex flex-col items-center px-2">
			<h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
				Upload your prescriptions and get the Summary
			</h2>
			<input
				type="file"
				accept=".txt,.pdf,.jpg,.png,.jpeg,.gif,.doc,.docx"
				className="block w-full max-w-xs mb-4 px-4 py-2 border border-indigo-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
				onChange={handleFileUpload}
			/>
			{fileName && (
				<div className="mb-2 text-sm text-gray-600 text-center">
					Selected file: <span className="font-semibold">{fileName}</span>
				</div>
			)}
			<div
				className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mt-2 mb-4 overflow-auto"
				style={{ minHeight: "240px", maxHeight: "600px" }}
			>
				{loading ? (
					<div className="flex items-center justify-center h-full">
						<span className="animate-pulse text-indigo-500 font-semibold">
							Analyzing prescription...
						</span>
					</div>
				) : summary ? (
					<div className="text-gray-800 text-base whitespace-pre-line">
						{summary}
					</div>
				) : (
					<div className="text-gray-400 text-center">
						Your prescription summary will appear here after upload.
					</div>
				)}
			</div>
		</div>
	);
};

export default PrescriptionSummary;

// meetController.js
// Controller for Google Meet link generation using Google Calendar API
import fs from "fs";
import path from "path";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Helper to get OAuth2 client
function getOAuth2Client() {
	const credentialsPath =
		process.env.GOOGLE_CREDENTIALS_PATH ||
		path.join(
			__dirname,
			"../client_secret_879902559380-q676eg8o2ogfdkk445fso7ktb3sa9t28.apps.googleusercontent.com.json"
		);
	const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
	const { client_secret, client_id } = credentials.web;
	const redirect_uris = credentials.web.redirect_uris || ["http://localhost"];
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);
	// Set refresh token from env
	oAuth2Client.setCredentials({
		refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
	});
	return oAuth2Client;
}

// Create a Google Meet event and return the meet link
export const createMeet = async (req, res) => {
	try {
		const { summary, description, startTime, endTime, attendees } = req.body;
		const auth = getOAuth2Client();
		const calendar = google.calendar({ version: "v3", auth });
		const event = {
			summary: summary || "Emergency Appointment",
			description: description || "Emergency appointment via Ski Medical",
			start: { dateTime: startTime, timeZone: "Asia/Kolkata" },
			end: { dateTime: endTime, timeZone: "Asia/Kolkata" },
			attendees: attendees || [],
			conferenceData: {
				createRequest: { requestId: Math.random().toString(36).substring(2) },
			},
		};
		const response = await calendar.events.insert({
			calendarId: "primary",
			resource: event,
			conferenceDataVersion: 1,
		});
		const meetLink = response.data.conferenceData?.entryPoints?.find(
			(e) => e.entryPointType === "video"
		)?.uri;
		res.json({ meetLink });
	} catch (error) {
		console.error("Error creating Google Meet:", error);
		res.status(500).json({ error: "Failed to create Google Meet" });
	}
};

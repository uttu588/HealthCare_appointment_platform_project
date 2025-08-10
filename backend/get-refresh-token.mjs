// get-refresh-token.mjs
// This script will help you generate a Google OAuth2 refresh token for your app.
// Run this file with: node get-refresh-token.mjs

import { google } from "googleapis";
import readline from "readline";
import fs from "fs";

// Load your client_secret_xxx.json downloaded from Google Cloud Console
const CREDENTIALS_PATH =
	"./client_secret_879902559380-q676eg8o2ogfdkk445fso7ktb3sa9t28.apps.googleusercontent.com (1).json";

// The required OAuth2 scopes for Google Calendar/Meet
const SCOPES = [
	"https://www.googleapis.com/auth/calendar",
	"https://www.googleapis.com/auth/calendar.events",
	"https://www.googleapis.com/auth/calendar.events.readonly",
	"https://www.googleapis.com/auth/calendar.readonly",
	"https://www.googleapis.com/auth/calendar.settings.readonly",
];

function getOAuth2Client() {
	const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

function getAccessToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
		prompt: "consent",
	});
	console.log("Authorize this app by visiting this url:", authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question("Enter the code from that page here: ", (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error("Error retrieving access token", err);
			console.log("\nYour token object (save refresh_token in .env!):\n");
			console.log(JSON.stringify(token, null, 2));
			// Optionally, save token to a file
			fs.writeFileSync("google_token.json", JSON.stringify(token, null, 2));
			console.log("\nToken saved to google_token.json");
		});
	});
}

function main() {
	const oAuth2Client = getOAuth2Client();
	getAccessToken(oAuth2Client);
}

main();

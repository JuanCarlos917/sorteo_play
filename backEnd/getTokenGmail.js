// getToken.js
const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(__dirname, 'token.json');

const oAuth2Client = new google.auth.OAuth2(
	'379175314491-am815o6m0op111talovr214th9g635vp.apps.googleusercontent.com',
	'GOCSDX-dtLldYyVd43sq7ISf_shoPhnT7f3',
	'http://localhost',
);

const authUrl = oAuth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
rl.question('Enter the code from that page here: ', (code) => {
	rl.close();
	oAuth2Client.getToken(code, (err, token) => {
		if (err) return console.error('Error retrieving access token', err);
		oAuth2Client.setCredentials(token);
		fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
		console.log('Token stored to', TOKEN_PATH);
	});
});

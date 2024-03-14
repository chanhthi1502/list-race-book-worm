const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// TODO: Database connection
async function connectToDatabase() {

}

// Asynchronous function to load API Routes
// This will ensure that route files are loaded concurrently,
// optimizing the startup time of the server
async function loadRoutes() {
	const routesDir = path.join(__dirname, 'routes');
	const readDirectory = util.promisify(fs.readdir);
	try {
		const files = await readDirectory(routesDir);
		await Promise.all(files.map(async file => {
			const routeFilePath = path.join(routesDir, file);
			const route = require(routeFilePath);
			app.use(route);
		}));
		console.log('Routes loaded successfully');
	} catch (error) {
		console.error('Error loading routes:', error);
		process.exit(1);
	}
}

// Start server
async function startServer() {
	await connectToDatabase();
	await loadRoutes();
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

startServer().catch(error => {
	console.error('Error starting server:', error);
	process.exit(1);
})
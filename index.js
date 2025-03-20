const express = require('express');
const { resolve } = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3010; // Use PORT from .env or default to 3010

// Serve static files from the "static" folder
app.use(express.static('static'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API route to send dynamic data based on environment variable
app.get('/api/message', (req, res) => {
    const isAdmin = process.env.IS_ADMIN === 'true';

    const response = isAdmin
        ? { message: "Welcome, Admin!", data: ["Admin Data 1", "Admin Data 2"] }
        : { message: "Welcome, User!", data: ["User Data 1", "User Data 2"] };

    res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

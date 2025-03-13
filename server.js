// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3200;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root and public directory
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// GET route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST route to process the hex input and display the analyzed data
app.post('/analyze', async (req, res) => {
  // Retrieve the hex value from the form submission
  const hexInput = req.body.hex;

  try {
    // Prepare the request payload
    const data = {
      Hex: hexInput,
      ProtocolType: 'JT808'
    };

    // Configure the axios request using the API URL from the environment variable
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.API_URL,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };

    // Send the request to the external API
    const response = await axios.request(config);

    // Axios already returns parsed JSON in response.data
    const jsonData = response.data;

    // Respond by printing the analyzed data (formatted as JSON)
    res.send(jsonData.Result.Packages[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while analyzing the hex data.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

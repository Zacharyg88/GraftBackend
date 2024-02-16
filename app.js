const express = require('express');
const app = express();
const PORT = process.env.PORT || 5432; // Specify the port number for your server

// Define routes, middleware, etc.

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
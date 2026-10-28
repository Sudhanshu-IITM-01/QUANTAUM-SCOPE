const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send({ message: 'Backend is up and running!' });
});

// Sample API Route
app.get('/api/data', (req, res) => {
    res.json({ 
        success: true, 
        items: ["Quantum Item 1", "Quantum Item 2", "Quantum Item 3"] 
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
    let cannedItems = [
        { name: "Tomato Soup", joiningDate: new Date(2021, 5, 1), expirationDate: new Date(2025, 3, 15) },
        { name: "Baked Beans", joiningDate: new Date(2021, 6, 5), expirationDate: new Date(2025, 8, 20) },
        { name: "Corn", joiningDate: new Date(2021, 7, 10), expirationDate: new Date(2024, 10, 30) },
        { name: "Tuna", joiningDate: new Date(2021, 11, 12), expirationDate: new Date(2026, 5, 25) }
    ];

app.get('/api/canneditems', (req, res) => {
    res.json(cannedItems);
});

app.post('/api/canneditems', (req, res) => {
    const { name, brand, expirationDate } = req.body;
    if (!name || !brand || !expirationDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newItem = { name, brand, expirationDate };
    cannedItems.push(newItem);
    res.status(201).json(newItem);
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


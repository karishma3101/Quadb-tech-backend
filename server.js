// server.js
const express = require('express');
const mongoose = require('mongoose');
const Ticker = require('./models/ticker');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/wazirx_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static('public'));

app.get('/tickers', async (req, res) => {
    try {
        const tickers = await Ticker.find();
        res.json(tickers);
    } catch (error) {
        res.status(500).send('Error fetching tickers');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

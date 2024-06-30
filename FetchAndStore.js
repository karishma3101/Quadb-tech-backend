// fetchAndStore.js
const axios = require('axios');
const mongoose = require('mongoose');
const Ticker = require('./models/ticker');

mongoose.connect('mongodb://localhost:27017/wazirx_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const fetchAndStoreData = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = Object.values(response.data).slice(0, 10);

        await Ticker.deleteMany({}); // Clear existing data

        for (const ticker of tickers) {
            await Ticker.create({
                name: ticker.name,
                last: ticker.last,
                buy: ticker.buy,
                sell: ticker.sell,
                volume: ticker.volume,
                base_unit: ticker.base_unit
            });
        }

        console.log('Data fetched and stored successfully!');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error fetching or storing data:', error);
        mongoose.disconnect();
    }
};

fetchAndStoreData();

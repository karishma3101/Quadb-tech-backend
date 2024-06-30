document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/tickers');
        const tickers = await response.json();
        const tableBody = document.getElementById('tickers-table-body');

        tickers.forEach((ticker, index) => {
            const row = document.createElement('tr');

            const cellIndex = document.createElement('td');
            cellIndex.textContent = index + 1;
            row.appendChild(cellIndex);

            const cellName = document.createElement('td');
            cellName.textContent = ticker.name;
            row.appendChild(cellName);

            const cellLast = document.createElement('td');
            cellLast.textContent = `₹ ${ticker.last}`;
            row.appendChild(cellLast);

            const cellBuySell = document.createElement('td');
            cellBuySell.textContent = `₹ ${ticker.buy} / ₹ ${ticker.sell}`;
            row.appendChild(cellBuySell);

            const cellVolume = document.createElement('td');
            cellVolume.textContent = ticker.volume;
            row.appendChild(cellVolume);

            const cellBaseUnit = document.createElement('td');
            cellBaseUnit.textContent = ticker.base_unit;
            row.appendChild(cellBaseUnit);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
});

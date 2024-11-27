let balance = 1000;
let portfolio = {
  weazel: 0,
};

let stockPrices = {
  weazel: 100,
};

let priceChange = {
  weazel: 0,
};

function updateBalance() {
  document.getElementById('balance').innerText = balance.toFixed(2);
}

function updateStockPriceDisplay() {
  for (const stock in stockPrices) {
    const priceElement = document.getElementById(`price-${stock}`);
    priceElement.innerText = stockPrices[stock].toFixed(2);

    const priceChangeElement = document.getElementById(`price-change-${stock}`);
    if (priceChange[stock] > 0) {
      priceChangeElement.className = 'green';
      priceChangeElement.innerText = `+${priceChange[stock].toFixed(2)} ↑`;
    } else if (priceChange[stock] < 0) {
      priceChangeElement.className = 'red';
      priceChangeElement.innerText = `${priceChange[stock].toFixed(2)} ↓`;
    } else {
      priceChangeElement.className = '';
      priceChangeElement.innerText = '';
    }
  }
}

function buyStock(stock) {
  const stockPrice = stockPrices[stock];
  if (balance >= stockPrice) {
    balance -= stockPrice;
    portfolio[stock]++;
    stockPrices[stock] *= 1.1;
    priceChange[stock] = stockPrices[stock] * 0.1;
    updateBalance();
    updateStockPriceDisplay();
    updatePortfolio();
  } else {
    alert('Not enough funds!');
  }
}

function sellStock(stock) {
  if (portfolio[stock] > 0) {
    const stockPrice = stockPrices[stock];
    balance += stockPrice * 0.8;
    portfolio[stock]--;
    stockPrices[stock] *= 0.8;
    priceChange[stock] = stockPrices[stock] * -0.2;
    updateBalance();
    updateStockPriceDisplay();
    updatePortfolio();
  } else {
    alert('You don\'t own any of this stock!');
  }
}

function updatePortfolio() {
  const portfolioList = document.getElementById('portfolio-list');
  portfolioList.innerHTML = '';
  
  for (const stock in portfolio) {
    if (portfolio[stock] > 0) {
      portfolioList.innerHTML += `
        <div class="portfolio-stock">
          <h3>${stock.charAt(0).toUpperCase() + stock.slice(1)}: ${portfolio[stock]}</h3>
          <p>Price: $${stockPrices[stock].toFixed(2)}</p>
        </div>
      `;
    }
  }
}

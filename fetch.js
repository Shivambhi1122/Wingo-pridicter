const fetch = require('node-fetch');

async function getLatestResult() {
  const res = await fetch('https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=' + Date.now());
  const data = await res.json();
  return data.data[0]; // latest period
}

function predict(num) {
  const sum = num.split(',').reduce((a,b)=>a+parseInt(b),0);
  return sum >= 11 ? 'BIG' : 'SMALL';
}

async function run() {
  while(true) {
    try {
      const latest = await getLatestResult();
      const prediction = predict(latest.number);
      console.log(`Period: ${latest.issueNumber}, Number: ${latest.number}, Prediction: ${prediction}`);
    } catch(e) {
      console.log('Error:', e.message);
    }
    await new Promise(resolve => setTimeout(resolve, 60000)); // 1 min interval
  }
}

run();

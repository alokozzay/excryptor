const rp = require("request-promise");
const express = require("express");

let key = "23d14b58-5d96-453a-8714-25aa881e31cd";

/*====порты сервера, на которыу должны приходить запросы====*/

const main = 3002;
const all = 3004;
const coinData = 3006;
const btc = 3008;
const eth = 3010;
const ltc = 3012;
const rand = 3016;

/*=========================================================*/

const cors = require("cors");
const appTable = express();
const appAll = express();
const appDataCoins = express();
const appBtc = express();
const appEth = express();
const appLtc = express();
const appPar = express();
const randCount = express();

/*=============переменные, в которых хранятся все данные============*/

let tableData;
let allData;
let coinsData;
let btcData;
let ethData;
let ltcData;
let randPar;
let godexMas;

let allJoinedMas = [];
let tableJoinedMas = [];
let btcJoinedMas = [];
let ethJoinedMas = [];
let ltcJoinedMas = [];

let a1 = 0; //таблица
let a2 = 0; //все валюты
let a3 = 0; //btc
let a4 = 0; //eth
let a5 = 0; //ltc
let c = 0; //годекс

/*==================================================================*/
let corsOptions = {
  origin: "http://80.78.241.227",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// let corsOptions = {
//   // origin: "http://80.78.241.227", //вставить полную ссылку на сайт
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

/*==================функции для получения данных======================*/

function tableDataGet() {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=15&convert=USD",
    headers: {
      "X-CMC_PRO_API_KEY": key,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((resp) => {
      tableData = resp;
      a1++;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
    });
}
function allDataGet() {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=1000&convert=USD",
    headers: {
      "X-CMC_PRO_API_KEY": "23d14b58-5d96-453a-8714-25aa881e31cd",
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((resp) => {
      allData = resp;
      a2++;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
    });
}
function coinsDataGet() {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,LTC",
    headers: {
      "X-CMC_PRO_API_KEY": key,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((resp) => {
      coinsData = resp;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
    });
}
function btcDataGet() {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=500&convert=BTC",
    headers: {
      "X-CMC_PRO_API_KEY": key,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((resp) => {
      btcData = resp;
      a3++;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
    });
}
function ethDataGet() {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=500&convert=ETH",
    headers: {
      "X-CMC_PRO_API_KEY": key,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((resp) => {
      ethData = resp;
      a4++;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
    });
}
function ltcDataGet() {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=500&convert=LTC",
    headers: {
      "X-CMC_PRO_API_KEY": key,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((resp) => {
      ltcData = resp;
      a5++;
    })
    .catch((err) => {
      console.log("API call error:", err.message);
    });
}
function godexData() {
  const settings = {
    async: true,
    crossDomain: true,
    url: "http://api.godex.io/api/v1/coins",
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  rp(settings)
    .then((resp) => {
      godexMas = JSON.parse(resp);
      a1++;
      a2++;
      a3++;
      a4++;
      a5++;
      c++;
    })
    .catch((err) => {
      console.log("API call error godexData:", err.message);
    });
}

function randFunc() {
  let min = getRandomNum(5, 15).toFixed(1);
  let max = getRandomNum(30, getRandomNum(10, 60 - min)).toFixed(1);
  let randCurent = getRandomNum(500, 3500).toFixed(0);

  randPar = [min, max, randCurent];
}

setInterval(() => { 
  if (c === 1) {
    if (a1 === 2) {
      tableMasJoin();
      a1 = 0;
    }
    if (a2 === 2) {
      allMasJoin();
      a2 = 0;
    }
    if (a3 === 2) {
      btcMasJoin();
      a3 = 0;
    }
    if (a4 === 2) {
      ethMasJoin();
      a4 = 0;
    }
    if (a5 === 2) {
      ltcMasJoin();
      a5 = 0;
    }
  }
}, 200);

function tableMasJoin() {
  for (let i = 0; i < godexMas.length; i++) {
    for (let j = 0; j < tableData.data.length; j++) {
      if (
        godexMas[i]["code"].toLowerCase() ==
        tableData.data[j]["symbol"].toLowerCase()
      ) {
        let obj = {
          code: godexMas[i]["code"],
          name: godexMas[i]["name"],
          icon: godexMas[i]["icon"],
          slug: tableData.data[j]["slug"],
          price: tableData.data[j]["quote"]["USD"]["price"],
          percent_change_24h:
            tableData.data[j]["quote"]["USD"]["percent_change_24h"],
          volume_24h: tableData.data[j]["quote"]["USD"]["volume_24h"],
        };
        tableJoinedMas.push(obj);
      }
    }
  }
}

function allMasJoin() {
  for (let i = 0; i < godexMas.length; i++) {
    for (let j = 0; j < allData.data.length; j++) {
      if (
        godexMas[i]["code"].toLowerCase() ==
        allData.data[j]["symbol"].toLowerCase()
      ) {
        let obj = {
          code: godexMas[i]["code"],
          name: godexMas[i]["name"],
          icon: godexMas[i]["icon"],
          slug: allData.data[j]["slug"],
          price: allData.data[j]["quote"]["USD"]["price"],
          percent_change_24h:
            allData.data[j]["quote"]["USD"]["percent_change_24h"],
          volume_24h: allData.data[j]["quote"]["USD"]["volume_24h"],
        };
        allJoinedMas.push(obj);
      }
    }
  }
}

function btcMasJoin() {
  for (let i = 0; i < godexMas.length; i++) {
    for (let j = 0; j < btcData.data.length; j++) {
      if (
        godexMas[i]["code"].toLowerCase() ==
        btcData.data[j]["symbol"].toLowerCase()
      ) {
        let obj = {
          code: godexMas[i]["code"],
          name: godexMas[i]["name"],
          icon: godexMas[i]["icon"],
          slug: btcData.data[j]["slug"],
          price: btcData.data[j]["quote"]["BTC"]["price"],
          percent_change_24h:
            btcData.data[j]["quote"]["BTC"]["percent_change_24h"],
          volume_24h: btcData.data[j]["quote"]["BTC"]["volume_24h"],
        };
        btcJoinedMas.push(obj);
      }
    }
  }
}

function ethMasJoin() {
  for (let i = 0; i < godexMas.length; i++) {
    for (let j = 0; j < ethData.data.length; j++) {
      if (
        godexMas[i]["code"].toLowerCase() ==
        ethData.data[j]["symbol"].toLowerCase()
      ) {
        let obj = {
          code: godexMas[i]["code"],
          name: godexMas[i]["name"],
          icon: godexMas[i]["icon"],
          slug: ethData.data[j]["slug"],
          price: ethData.data[j]["quote"]["ETH"]["price"],
          percent_change_24h:
            ethData.data[j]["quote"]["ETH"]["percent_change_24h"],
          volume_24h: ethData.data[j]["quote"]["ETH"]["volume_24h"],
        };
        ethJoinedMas.push(obj);
      }
    }
  }
}

function ltcMasJoin() {
  for (let i = 0; i < godexMas.length; i++) {
    for (let j = 0; j < ltcData.data.length; j++) {
      if (
        godexMas[i]["code"].toLowerCase() ==
        ltcData.data[j]["symbol"].toLowerCase()
      ) {
        let obj = {
          code: godexMas[i]["code"],
          name: godexMas[i]["name"],
          icon: godexMas[i]["icon"],
          slug: ltcData.data[j]["slug"],
          price: ltcData.data[j]["quote"]["LTC"]["price"],
          percent_change_24h:
            ltcData.data[j]["quote"]["LTC"]["percent_change_24h"],
          volume_24h: ltcData.data[j]["quote"]["LTC"]["volume_24h"],
        };
        ltcJoinedMas.push(obj);
        
      }
    }
  }
  
}

/*====================================================================*/

/*==================ответы сервера===================*/

appTable.use(cors(corsOptions));
appTable.use((request, response) => {
  response.json(tableJoinedMas);
});
appAll.use(cors(corsOptions));
appAll.use((request, response) => {
  response.json(allJoinedMas);
});
appDataCoins.use(cors(corsOptions));
appDataCoins.use((request, response) => {
  response.json(coinsData);
});
appBtc.use(cors(corsOptions));
appBtc.use((request, response) => {
  response.json(btcJoinedMas);
});
appEth.use(cors(corsOptions));
appEth.use((request, response) => {
  response.json(ethJoinedMas);
});
appLtc.use(cors(corsOptions));
appLtc.use((request, response) => {
  response.json(ltcJoinedMas);
});
randCount.use(cors(corsOptions));
randCount.use((request, response) => {
  response.json(randPar);
});

/*=======================================================*/

/*===================прослушка портов================================*/

appTable.listen(main, () => {
  console.log("Server 'Main Page' has been started...");
});
appAll.listen(all, () => {
  console.log("Server 'All Currencies' has been started...");
});
appDataCoins.listen(coinData, () => {
  console.log("Server 'Data Coins' has been started...");
});
appBtc.listen(btc, () => {
  console.log("Server 'BTC Data' has been started...");
});
appEth.listen(eth, () => {
  console.log("Server 'ETH Data' has been started...");
});
appLtc.listen(ltc, () => {
  console.log("Server 'LTC Data' has been started...");
});
randCount.listen(rand, () => {
  console.log("Server 'Random' has been started...");
});

/*==================================================================*/

/*=================вызов функций с получением данных=================*/
godexData();
allDataGet();
tableDataGet();
btcDataGet();
ethDataGet();
ltcDataGet();
coinsDataGet();
randFunc();

setInterval(() => {
  allDataGet();
  btcDataGet();
  ethDataGet();
  ltcDataGet();
  coinsDataGet();
}, 21600000); //время между обновлениями данных (в миллисекундах) (по умолчанию 6 часов)

setInterval(() => {
  tableDataGet();
}, 3600000); //1 час

setInterval(() => {
  let time = new Date().getHours();

  if (time == 0) {
    randFunc();
  }
}, 60000);

/*====================================================================*/

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

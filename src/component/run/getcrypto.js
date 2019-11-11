import axios from "axios";
const {
  REACT_APP_API_KEY_MARKETCAP,
  REACT_APP_crossanywhere,
  REACT_APP_listAllCrypto
} = process.env;

export const initialConfig = (limit, convert) => {
  return {
    method: "get",
    baseURL: `${REACT_APP_crossanywhere}${REACT_APP_listAllCrypto}?start=1&limit=${limit}&convert=${convert}&cryptocurrency_type=all`,
    // baseURL:
    //   `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=${convert}&cryptocurrency_type=all&sort=market_cap&sort_dir=desc`,
    responseType: "json",
    headers: {
      "X-CMC_PRO_API_KEY": `${REACT_APP_API_KEY_MARKETCAP}`
    }
  };
};

export const market = {
  get: async value => {
    const result = axios(value)
      .then(res => {
        return todoAPI(res);
      })
      .catch(err => {
        console.log(err);
      });

    return await result;
  }
};

const todoAPI = apidata => {
  const result = apidata.data.data.map(res => {
    return {
      cmc_rank: res.cmc_rank,
      name: res.name,
      symbol: res.symbol,
      circulating_supply: res.circulating_supply,
      market_cap: todoQuote(res.quote).market_cap,
      price: todoQuote(res.quote).price,
      volume_24h: todoQuote(res.quote).volume_24h,
      percent_change_24h: todoQuote(res.quote).percent_change_24h,
      percent_change_1h: todoQuote(res.quote).percent_change_1h,
      last_updated: todoQuote(res.quote).last_updated
    };
  });

  filterNull(result);
  return {
    statusAPI: apidata.status,
    dataStatus: apidata.data.status,
    marketTable: filterNull(result)
  };
};

const filterNull = value => {
  let index = 0;
  while (index < value.length) {
    if (value[index].market_cap === null) {
      value.splice(index, 1);
    }
    index += 1;
  }
  return value.filter(x => x !== null);
};

const todoQuote = value => {
  if (Object.getOwnPropertyNames(value).toString() === "BTC") {
    return value.BTC;
  }
  if (Object.getOwnPropertyNames(value).toString() === "USD") {
    return value.USD;
  }
  if (Object.getOwnPropertyNames(value).toString() === "IDR") {
    return value.IDR;
  }
  return value.USD;
};

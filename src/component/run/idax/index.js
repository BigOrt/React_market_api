import axios from "axios";
import crypto from "crypto";
import qs from "qs";

const {
  REACT_APP_crosswhereURL,
  REACT_APP_baseURL,
  REACT_APP_API_Key_IDAX,
  REACT_APP_Secret_Key,
  REACT_APP_Ticker,
  REACT_APP_Trades,
  REACT_APP_Depth
} = process.env;

export const config = (method, params) => {
  const timestamp = new Date(Date.now());
  const data =
    params === ""
      ? qs.stringify({
          method,
          nonce: Date.parse(timestamp)
        })
      : qs.stringify({
          method,
          nonce: Date.parse(timestamp),
          params
        });

  return {
    method: "POST",
    baseURL: REACT_APP_crosswhereURL + REACT_APP_baseURL,
    data,
    headers: {
      Key: REACT_APP_API_Key_IDAX,
      Sign: crypto
        .createHmac("sha512", REACT_APP_Secret_Key)
        .update(data)
        .digest("hex")
    }
  };
};

export const idax = {
  Go: async (method, params) => {
    return await axios(config(method, params)).then(res => {
      return res.data;
    });
  },
  ticker: async () => {
    return await axios.get(REACT_APP_Ticker).then(res => res.data.ticker);
  },
  trades: async () => {
    return await axios.get(REACT_APP_Trades).then(res => {
      let result = [];
      let num = 0;
      while (num < 10) {
        result[num] = res.data[num];
        num += 1;
      }
      return result;
    });
  },
  Depth: async () => {
    return await axios.get(REACT_APP_Depth).then(res => {
      return {
        buy: res.data.buy.map(x => x.map(y => y)),
        sell: res.data.sell.map(x => x.map(y => y))
      };
    });
  },
  getAllPublic: async () => {
    const ticker = await axios.get(REACT_APP_Ticker).then(res => res.data.ticker);
    const trades = await axios.get(REACT_APP_Trades).then(res => {
      let result = [];
      let num = 0;
      while (num < 10) {
        result[num] = res.data[num];
        num += 1;
      }
      return result;
    });
    const depth = await axios.get(REACT_APP_Depth).then(res => {
      return {
        buy: {
          pricebtc: sliceoneColumn(res.data.buy, 0),
          btcreceive: sliceoneColumn(res.data.buy, 1),
          priceidr: multipleColumn(
            sliceoneColumn(res.data.buy, 0),
            sliceoneColumn(res.data.buy, 1),
            res.data.buy.length
          )
        },
        sell: {
          pricebtc: sliceoneColumn(res.data.sell, 0),
          btcreceive: sliceoneColumn(res.data.sell, 1),
          priceidr: multipleColumn(
            sliceoneColumn(res.data.sell, 0),
            sliceoneColumn(res.data.sell, 1),
            res.data.sell.length
          )
        }
      };
    });

    return {
      ticker,
      trades,
      depth
    };
  }
};

const sliceoneColumn = (value, column) => {
  let n = 0;
  let bucket = [];
  while (n < value.length) {
    bucket.push(value[n][column]);
    n++;
  }
  return bucket.slice(0, 150);
};

function multipleColumn(value1, value2, length) {
  let localstate = [];
  for (let i = 0; i < length; i++) {
    localstate.push(parseFloat(value1[i]) * parseFloat(value2[i]));
  }
  return localstate.slice(0, 150);
}

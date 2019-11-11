import axios from "axios";
const { REACT_APP_apikey } = process.env

const config = {
  method: "get",
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=NYC&limit=1",
  responseType: "json",
  headers: {
    Authorization: `Bearer ${REACT_APP_apikey}`,
  }
};

export const yelp = {
  get: async () => {
    return await axios(config)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log("What Error: ", err);
      });
  }
};

// console.log(yelp.get().then(x=>console.log(x)));
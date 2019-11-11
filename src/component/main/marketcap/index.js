import React, { Fragment, useState, useEffect } from "react";
import {
  Badge,
  Table,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Container,
  Row,
  Col,
  Alert
} from "react-bootstrap";
import { market, initialConfig } from "../../run/getcrypto";

//todo
import { sortMethod } from "./todo";

const Marketcap = () => {
  const [limit, setLimit] = useState(50);
  const [convert, setConvert] = useState("USD");
  const [sort, setSort] = useState("market cap");
  const [sortby, setSortBy] = useState(-1);
  const [infotable, setInfotable] = useState(true);
  const [limitPrint, setLimitPrint] = useState(limit);
  const coinmarket = useCoinmarketdata(limit, convert);
  const getTable = useGetTableValue(
    coinmarket,
    convert,
    sort,
    sortby,
    limitPrint
  );
  const response = useResponseAPI(coinmarket);
  console.log(coinmarket.marketTable)

  //handle
  const handleSort = (value, sortby) => {
    if (sortby === -1) {
      setSortBy(1);
      setSort(value);
    } else {
      setSortBy(-1);
      setSort(value);
    }
  };

  const DropdownSort = value => {
    switch (value) {
      case "Count":
        return [50, 100].map((res, key) => {
          return (
            <div key={key}>
              <Dropdown.Item onClick={() => setLimit(res)}>{res}</Dropdown.Item>
            </div>
          );
        });
      case "Convert":
        return ["USD", "IDR", "BTC"].map((res, key) => {
          return (
            <div key={key}>
              <Dropdown.Item onClick={() => setConvert(res)}>
                {res}
              </Dropdown.Item>
            </div>
          );
        });
      case "Sort":
        return [
          "#",
          "name",
          "price",
          "market cap",
          "circulating supply",
          "volume 24",
          "change 24h"
        ].map((res, key) => {
          return (
            <div key={key}>
              <Dropdown.Item onClick={() => handleSort(res, sortby)}>
                {res}
              </Dropdown.Item>
            </div>
          );
        });
      case "Limit":
        return [10, 30, 50].map((res, key) => {
          return (
            <div key={key}>
              <Dropdown.Item
                onClick={() => {
                  setLimitPrint(res);
                  setInfotable(true);
                }}
              >
                {res}
              </Dropdown.Item>
            </div>
          );
        });
      default:
        return <Dropdown.Item href="#/action-1">default</Dropdown.Item>;
    }
  };

  return (
    <Fragment>
      <Card>
        <Card.Header>
          <h2>
            MarketCap res: <Badge variant="info">{response}</Badge>{" "}
          </h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col md={6} className="text-left pl-0">
                  <Alert
                    variant="info"
                    show={infotable}
                    onClose={() => setInfotable(false)}
                    dismissible
                  >
                   <Alert.Heading>
                   <h6>{`count of table ${limit} (API), ..count & convert!!.`}</h6>
                   </Alert.Heading>
                  </Alert>
                </Col>
                <Col md={6} className="text-right pr-0">
                  {["Limit", "Sort", "Count", "Convert"].map((title, key) => {
                    return (
                      <ButtonGroup
                        key={title}
                        className="mr-2"
                        aria-label="First Group"
                      >
                        <DropdownButton
                          id={title}
                          variant="light"
                          size="sm"
                          title={title}
                        >
                          {DropdownSort(title)}
                        </DropdownButton>
                      </ButtonGroup>
                    );
                  })}
                </Col>
              </Row>
            </Container>
          </Card.Title>

          <Table striped bordered hover responsive variant="md">
            <thead>
              <tr>
                {[
                  "#",
                  "name",
                  "price",
                  "market cap",
                  "circulating supply",
                  "volume 24",
                  "change 24h"
                ].map((thead, key) => (
                  <td key={key}>{thead}</td>
                ))}
              </tr>
            </thead>
            <tbody>{getTable}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

function useCoinmarketdata(lim, conv) {
  const [apidata, setApidata] = useState([]);

  const runAPI = (limit, convert) => {
    market.get(initialConfig(limit, convert)).then(res => {
      setApidata(res);
    });
  };

  useEffect(() => {
    runAPI(lim, conv);
    let timer = setInterval(() => {
      runAPI(lim, conv);
    }, 3600000);
    return () => {
      clearInterval(timer);
    };
  }, [lim, conv]);

  return apidata;
}

const getTd = (value, currency, sort, sortby, limitPrint) => {
  //precentage
  const usePercetage1h = price => {
    if (price < 0) {
      return (
        <Badge variant="danger">
          <span>{`${Math.abs(parseFloat(price).toFixed(2))}%`}</span>
        </Badge>
      );
    }
    return (
      <Badge variant="success">
        <span>{`${Math.abs(parseFloat(price).toFixed(2))}%`}</span>
      </Badge>
    );
  };

  const sortBy = (sort, sortby) => {
    switch (sort) {
      case "#":
        if (sortby === -1) {
          return value.marketTable.sort((a, b) =>
            a.cmc_rank < b.cmc_rank ? 1 : -1
          );
        } else {
          return value.marketTable.sort((a, b) =>
            a.cmc_rank > b.cmc_rank ? 1 : -1
          );
        }

      case "name":
        if (sortby === -1) {
          return value.marketTable.sort((a, b) => (a.name < b.name ? 1 : -1));
        } else {
          return value.marketTable.sort((a, b) => (a.name > b.name ? 1 : -1));
        }

      case "price":
        if (sortby === -1) {
          return value.marketTable.sort((a, b) => (a.price < b.price ? 1 : -1));
        } else {
          return value.marketTable.sort((a, b) => (a.price > b.price ? 1 : -1));
        }

      case "market cap":
        if (sortby === -1) {
          return value.marketTable.sort((a, b) =>
            a.market_cap < b.market_cap ? 1 : -1
          );
        } else {
          return value.marketTable.sort((a, b) =>
            a.market_cap > b.market_cap ? 1 : -1
          );
        }

      case "circulating supply":
        if (sortby === -1) {
          return value.marketTable.sort((a, b) =>
            a.circulating_supply < b.circulating_supply ? 1 : -1
          );
        } else {
          return value.marketTable.sort((a, b) =>
            a.circulating_supply > b.circulating_supply ? 1 : -1
          );
        }

      case "volume 24":
        if (sortby === -1) {
          return value.marketTable.sort((a, b) =>
            a.volume_24h < b.volume_24h ? 1 : -1
          );
        } else {
          return value.marketTable.sort((a, b) =>
            a.volume_24h > b.volume_24h ? 1 : -1
          );
        }

      case "change 24h":
        if (sortby === -1) {
          return value.marketTable.sort((a, b) =>
            a.percent_change_24h < b.percent_change_24h ? 1 : -1
          );
        } else {
          return value.marketTable.sort((a, b) =>
            a.percent_change_24h > b.percent_change_24h ? 1 : -1
          );
        }

      default:
        return value.marketTable;
    }
  };

  //sorting ASC/DSC
  const runSortMethod = (value1, value2, limitPrint) => {
    switch (limitPrint) {
      case 10:
        return sortMethod.specificAmount(value1, 10);
      case 30:
        return sortMethod.specificAmount(value1, 30);
      case 50:
        return sortMethod.specificAmount(value1, 50);
      default:
        return sortMethod.mirrorArray(value1.marketTable, value2.marketTable);
    }
  };

  //run sort
  sortBy(sort, sortby);
  // console.log(
  //   runSortMethod(value.marketTable, value.marketTable, limitPrint).length
  // );
  const TD = runSortMethod(
    value.marketTable,
    value.marketTable,
    limitPrint
  ).map((api, key) => {
    return (
      <tr key={key}>
        <td>{api.cmc_rank}</td>
        <td>{api.name}</td>
        <td>{priceLessZero(api.price)}</td>
        <td>
          {api.market_cap.toLocaleString("en-US", {
            style: "currency",
            currency: currency
          })}
        </td>
        <td>
          {`${api.circulating_supply
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")} `}
          <Badge variant="secondary">{api.symbol}</Badge>
        </td>
        <td>
          {api.volume_24h.toLocaleString("en-US", {
            style: "currency",
            currency: currency
          })}
        </td>
        <td>{usePercetage1h(api.percent_change_24h)}</td>
      </tr>
    );

    function priceLessZero(value) {
      if (parseFloat(value) < 2) {
        return `${currency === "USD" ? "$" : currency}${api.price
          .toFixed(9)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
      }
      return `${currency === "USD" ? "$" : currency}${api.price
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    }
  });

  return TD;
};

const useGetTableValue = (value, currency, sort, sortby, limitPrint) => {
  if (!value) {
    return (
      <tr>
        <td colSpan="8">
          <h5>
            <Badge variant="light">Request failed</Badge>
          </h5>
        </td>
      </tr>
    );
  }
  switch (value.statusAPI) {
    case 200:
      return getTd(value, currency, sort, sortby, limitPrint);
    default:
      return (
        <tr>
          <td colSpan="8">
            <h5>
              <Badge variant="light">Request failed</Badge>
            </h5>
          </td>
        </tr>
      );
  }
};

const useResponseAPI = value => {
  if (!value) {
    return `Request failed`;
  }
  switch (value.statusAPI) {
    case 200:
      return `Successful`;
    case 400:
      return `Bad Request`;
    case 401:
      return `Unauthorized`;
    case 403:
      return `Forbidden`;
    case 429:
      return `Too Many Requests [limit data srry ...!]`;
    case 500:
      return `Internal Server Error `;
    default:
      return `take a break pls ...!`;
  }
};

export default Marketcap;

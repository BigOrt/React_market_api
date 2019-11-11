import React from "react";
import { Container, Row, Col, Card, CardColumns } from "react-bootstrap";
import Chart from "chart.js";
import { useBuyPriceBtc, useBuyPriceIdr, useSellPriceBtc } from "./todo";

const Ticker = ({ ticker, depth }) => {
  const chartRef = React.useRef();
  const buyidr = useBuyPriceIdr(depth.buy || []);
  const buybtc = useBuyPriceBtc(depth.buy || []);
  const sellbtc = useSellPriceBtc(depth.sell || []);
  React.useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: buyidr,
        datasets: [
          {
            label: "PriceBid",
            borderColor: "#28a745",
            backgroundColor: "#28a745",
            data: buybtc,
            yAxisID: "y-axis-1",
            fill: false
          },
          {
            label: "PriceAsk",
            borderColor: "#dc3545",
            backgroundColor: "#dc3545",
            data: sellbtc,
            yAxisID: "y-axis-2",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true,
          position: "right"
        },
        responsive: true,
        title: {
          display: true,
          text: "BTC/IDR Depth"
        },
        tooltips: {
          mode: "index",
          intersect: true,
          callbacks: {
            title: tooltipItem => {
              return "Amount of IDR : " + tooltipItem[0].xLabel;
            },
            label: tooltipItem => {
              return `${
                tooltipItem.datasetIndex === 0 ? "PriceBid" : "PriceAsk"
              } : ${tooltipItem.value}`;
            }
          }
        },
        hover: {
          mode: "index",
          intersect: true
        },
        scales: {
          yAxes: [
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1"
            },
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-2"
            }
          ],
          // xAxes: [
          //   {
          //     type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          //     display: true,
          //     position: "bottom",
          //     id: "x-axis-1",
          //     ticks: {
          //       max:172897000,
          //       min:142897000,
          //       stepSize: 5000000
          //     }
          //   }
          // ]
        }
      }
    });
  }, [buyidr, buybtc, sellbtc]);

  const getTicker = (value, ticker) => {
    switch (value) {
      case "High Price":
        return parseInt(ticker.high)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      case "Low Price":
        return parseInt(ticker.low)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      case "Last Price":
        return parseInt(ticker.last)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      default:
        return "sorry not found ...!";
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12} className="pl-0 pr-0">
          <Card bg="white" text="black">
            <Card.Body>
              <Container>
                <Row>
                  <Col md={4}>
                    <Card.Title>
                      <h3>{`Ticker`}</h3>
                    </Card.Title>
                    <Card.Text>
                      Buy{" "}
                      <span>{`IDR ${parseInt(ticker.buy)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</span>
                      <br />
                      Sell{" "}
                      <span>
                        {parseInt(ticker.sell)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </span>
                      <br />
                      Vol BTC{" "}
                      <span>
                        {parseInt(ticker.vol_btc)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </span>
                      <br />
                      Vol IDR{" "}
                      <span>
                        {parseInt(ticker.vol_idr)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </span>
                      <br />
                      Time{" "}
                      <span>{new Date(ticker.server_time).toUTCString()}</span>
                      <br />
                    </Card.Text>
                  </Col>
                  <Col md={12}>
                    <canvas ref={chartRef} />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
          <br />
          <CardColumns>
            {["High Price", "Low Price", "Last Price"].map(x => (
              <Card
                key={x}
                bg={
                  x === "High Price"
                    ? "success"
                    : x === "Low Price"
                    ? "danger"
                    : "info"
                }
              >
                <Card.Body>
                  <Card.Title className="text-center">
                    <h4>{x}</h4>
                  </Card.Title>
                  <Card.Text className="text-center">
                    {getTicker(x, ticker)}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardColumns>
        </Col>
      </Row>
    </Container>
  );
};

export default Ticker;

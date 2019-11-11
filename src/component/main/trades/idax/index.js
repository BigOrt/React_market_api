import React, { Fragment } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
// import Chart from "chart.js";
import Ticker from "./ticker";
import Tradesbtc from "./trades";

import { idax } from "../../../run/idax/";

const Trades = () => {
  const [publicApi, setPublicApi] = React.useState([]);
  React.useEffect(() => {
    idax
      .getAllPublic()
      .then(x => {
        setPublicApi(x);
      })
      .catch(err => console.log(err));
  }, []);
  
  return (
    <Fragment>
      <Container>
        <Row>
          <Col className="p-0">
            <Card>
              <Card.Header as="h5">
                Indodax res: <Badge variant="warning">{`response`}</Badge>{" "}
              </Card.Header>
              <Card.Body>
                <Ticker
                  ticker={publicApi.ticker || []}
                  depth={publicApi.depth || []}
                />
                <Tradesbtc trades={publicApi.trades || []} />
                <br />
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Trades;

// const useChartDepth = () => {
//   const chartRef = React.useRef();
//   const myChartRef = chartRef.current.getContext("2d");
//   new Chart(myChartRef, {
//     type: "line",
//     data: {
//       labels: ["January", "February", "March", "April", "May", "June", "July"],
//       datasets: [
//         {
//           label: "Buy",
//           borderColor: "#28a745",
//           backgroundColor: "#28a745",
//           data: [10, 20, 30, 40, 50],
//           fill: false
//         },
//         {
//           label: "Sell",
//           borderColor: "#dc3545",
//           backgroundColor: "#dc3545",
//           data: [7, 49, 30, 22],
//           fill: false
//         }
//       ]
//     },
//     options: {
//       legend: {
//         labels: "none"
//       },
//       responsive: true,
//       title: {
//         display: true,
//         text: "BTC/IDR Depth"
//       },
//       tooltips: {
//         mode: "nearest",
//         intersect: true
//       },
//       hover: {
//         mode: "nearest",
//         intersect: true
//       }
//     }
//   });

//   return chartRef;
// };

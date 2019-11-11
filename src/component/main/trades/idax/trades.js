import React from "react";

import { Table, Badge, Container, Row, Col } from "react-bootstrap";

const Tradesbtc = ({ trades }) => {
  const getTable = useTradesTable(trades);
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={12} className="bg-white p-0">
            <Table size="sm" hover striped responsive variant="light">
              <thead>
                <tr>
                  <th className="text-center">Date</th>
                  <th className="text-left">Tid</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Price</th>
                </tr>
              </thead>
              <tbody>{getTable}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Tradesbtc;

const useTradesTable = value => {
  const tablemap = value.map((x, key) => {
    const color = x.type === "sell" ? "danger" : "success";
    return (
      <tr key={key} className="">
        <td className="text-center">
          {new Date(parseInt(x.date) + 1558240843086).toUTCString()}
        </td>
        <td className="text-left">
          <Badge variant={color}>{x.tid}</Badge>{" "}
        </td>
        <td className="text-center">
          <Badge variant={color}>{x.type}</Badge>
        </td>
        <td className="text-center">
          <Badge variant={color}>{x.amount}</Badge>
        </td>
        <td className="text-center">
          <Badge variant={color}>{`IDR ${parseInt(x.price)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</Badge>
        </td>
      </tr>
    );
  });

  return tablemap;
};

import React from "react";
import { Badge, Nav, Table, Card, CardDeck } from "react-bootstrap";
import DonutChart from "../../charts/donut";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Dashboard extends React.Component {
  state = {
    tab: [
      { name: "active", isActived: false },
      { name: "link-1", isActived: false },
      { name: "link-2", isActived: false },
      { name: "disabled", isActived: false }
    ]
  };

  actionTab = (event, index) => {
    let tab = this.state.tab;
    let i = 0;
    while (i < tab.length) {
      i === index ? (tab[i].isActived = true) : (tab[i].isActived = false);
      i += 1;
    }
    this.setState({ tab: tab });
  };

  verifyTabDisabled = name => {
    return name === "disabled" ? true : false;
  };

  render() {
    const { tab } = this.state;
    return (
      <div>
        <h2>
          Dashboard <Badge variant="secondary">Dashboard</Badge>
        </h2>
        <hr />
        <Nav fill variant="tabs" defaultActiveKey="/home">
          {tab.map((tab, index) => {
            return (
              <Nav.Item as="div" key={index}>
                <Nav.Link
                  eventKey={tab.name}
                  disabled={this.verifyTabDisabled(tab.name)}
                  onSelect={event => this.actionTab(event, index)}
                >
                  {tab.name}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
        <br />
        <div>
          {this.state.tab.map((tab, i) => {
            if (tab.name === "active" && tab.isActived === true) {
              return (
                <div key={i}>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              );
            } else if (tab.name === "link-1" && tab.isActived === true) {
              return (
                <div key={i}>
                  <h3>Link-1</h3>
                </div>
              );
            } else if (tab.name === "link-2" && tab.isActived === true) {
              return (
                <div key={i}>
                  <h4>Link-2</h4>
                </div>
              );
            }
            return <div key={i}></div>;
          })}
        </div>
        <hr />
        <DonutChart />
        <TradingViewWidget
          symbol="XBTUSD"
          theme={Themes.LIGHT}
          locale="ENG"
          width="980"
          height="300"
          hide_side_toolbar={false}
        /><br />
        <CardDeck>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Text>Card title that wraps to a new line</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Text>Card title that wraps to a new line</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Text>Card title that wraps to a new line</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Text>Card title that wraps to a new line</Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    );
  }
}

export default Dashboard;

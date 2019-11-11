import React, { Fragment } from "react";
import { Container, Row, Col, } from "react-bootstrap";
import jss from "react-jss";
import { styles } from "./component/style/style";
import MainNavbar from "./component/navbar";
import { SideList } from "./component/navside";
import Main from "./component/main";


class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MainNavbar classes={classes} />
        <Container>
          <Row>
            <Col as="nav" className={classes.sidebar} md={2}>
              <SideList />
            </Col>
            <Col as="main" className={classes.main} md={10} lg={10}>
              <Main />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
export default jss(styles)(App);

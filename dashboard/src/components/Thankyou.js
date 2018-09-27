import React, { Component } from "react";
import { Row, Col } from "react-materialize";
// import { Link } from "react-router-dom";

class Thankyou extends Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: "10%" }}>
          <Col s={12} m={2} />
          <Col s={12} m={8}>
            <h2>Thanks "{this.props.name}"</h2>
            <h3>Your Vote matters the most!</h3>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Thankyou;

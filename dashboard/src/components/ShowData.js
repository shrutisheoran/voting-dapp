import React, { Component } from "react";
import { Row, Col, Button } from "react-materialize";
import { Link } from "react-router-dom";
class ShowData extends Component {
  render() {
    const { name, aadhar, voterId } = this.props;
    return (
      <div>
        <Row style={{ marginTop: "5%" }}>
          <Col s={12} m={2} />
          <Col s={12} m={8}>
            <h5>Name: {name}</h5>
            <h5>Aadhar number: {aadhar}</h5>
            <h5>Address ID: {voterId}</h5>
            <Link to="/vote">
              <Button waves="light" style={{ marginTop: "15px" }}>
                Choose Candidate
              </Button>
            </Link>
          </Col>
          <Col s={0} m={2} />
        </Row>
      </div>
    );
  }
}

export default ShowData;

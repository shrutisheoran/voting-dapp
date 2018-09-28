import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-materialize";

class FrontPage extends Component {
  render() {
    return (
      <div className="front-page">
        <Row>
          <Col m={12} s={12} className="grid-example vote-india">
            <h1 className="title">VOTE INDIA</h1>
          </Col>
        </Row>
        <Row style={{ marginTop: "7%" }}>
          <Col m={3} s={0} className="grid-example" />
          <Col m={3} s={12} className="grid-example">
            <Link to="/scan" className="vote-link">
              <Card className="small vote-card" />
              <div className="small-header">Vote</div>
            </Link>
          </Col>
          <Col m={3} s={12} className="grid-example">
            <Link to="/dashboard" className="dashboard-link">
              <Card className="small dashboard-card" />
              <div className="small-header">Dashboard</div>
            </Link>
          </Col>
          <Col m={3} s={0} className="grid-example" />
        </Row>
      </div>
    );
  }
}

export default FrontPage;

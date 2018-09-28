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
          <Col m={4} s={12} className="grid-example">
            <Link to="/scan" className="vote-link">
              <Card className="small vote-card" />
              <div className="small-header">Vote</div>
            </Link>
          </Col>
          <Col m={4} s={12} className="grid-example">
            <Link to="/dashboard" className="dashboard-link">
              <Card className="small dashboard-card" />
              <div className="small-header">Dashboard</div>
            </Link>
          </Col>
          <Col m={4} s={0} className="grid-example">
            <Link to="/news" className="news-link">
              <Card className="small news-card" />
              <div className="small-header">News</div>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col m={2} s={12} />
          <Col m={4} s={0} className="grid-example">
            <Link to="/enrollment" className="small enrollment-card">
              <Card className="small enrollment-card" />
              <div className="small-header">Enrollment</div>
            </Link>
          </Col>
          <Col m={4} s={0} className="grid-example">
            <Link to="/details" className="small candidate-card">
              <Card className="small candidate-card" />
              <div className="small-header">Candidate Details</div>
            </Link>
          </Col>
          <Col m={2} s={12} />
        </Row>
      </div>
    );
  }
}

export default FrontPage;

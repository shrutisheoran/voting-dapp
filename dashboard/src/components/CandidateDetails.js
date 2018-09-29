import React, { Component } from "react";
import { Row, Col, Card, CardTitle } from "react-materialize";

class CandidateDetails extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col
            s={12}
            m={12}
            style={{
              textAlign: "center",
              backgroundColor: "#053449",
              color: "white"
            }}
          >
            <h2>Candidate Details!</h2>
          </Col>
        </Row>
        <Row>
          <Col m={4} s={12}>
            <Card
              horizontal
              header={
                <CardTitle image="https://images.cdn1.stockunlimited.net/preview1300/election-candidate_1534283.jpg" />
              }
            >
              <p>
                <span>
                  <b>Name:</b>
                  Candidate 1
                </span>
              </p>
              <p>
                <span>
                  <b>Age:</b>
                  57
                </span>
              </p>
              <p>
                <span>
                  <b>Qualifications:</b>
                  8th fail
                </span>
              </p>
              <p>
                <span>
                  <b>Political Party:</b>
                  Congress 
                </span>
              </p>
            </Card>
          </Col>
          <Col m={4} s={12}>
            <Card
              horizontal
              header={
                <CardTitle image="https://images.cdn1.stockunlimited.net/preview1300/election-candidate_1534283.jpg" />
              }
            >
              <p>
                <span>
                  <b>Name:</b>
                  Candidate 2
                </span>
              </p>
              <p>
                <span>
                  <b>Age:</b>
                  42
                </span>
              </p>
              <p>
                <span>
                  <b>Qualifications:</b>
                  10th pass
                </span>
              </p>
              <p>
                <span>
                  <b>Political Party:</b>
                  Bhartiya Janta Party
                </span>
              </p>
            </Card>
          </Col>
          <Col m={4} s={12}>
            <Card
              horizontal
              header={
                <CardTitle image="https://images.cdn1.stockunlimited.net/preview1300/election-candidate_1534283.jpg" />
              }
            >
              <p>
                <span>
                  <b>Name:</b>
                  Candidate 3
                </span>
              </p>
              <p>
                <span>
                  <b>Age:</b>
                  23
                </span>
              </p>
              <p>
                <span>
                  <b>Qualifications:</b>
                  5th pass
                </span>
              </p>
              <p>
                <span>
                  <b>Political Party:</b>
                  Aam Aadmi Party
                </span>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CandidateDetails;

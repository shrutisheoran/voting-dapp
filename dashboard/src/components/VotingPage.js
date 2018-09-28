import React, { Component } from "react";
import { Row, Col, Preloader, Table, Button } from "react-materialize";
import serializeForm from "form-serialize";
import ThankYou from "./Thankyou";

class VotingPage extends Component {
  onVote = e => {
    e.preventDefault();
    const value = serializeForm(e.target, { hash: true }).vote;
    !value ? alert("Please VOTE!!") : this.props.vote(value);
  };
  render() {
    if (Object.keys(this.props.voter).length > 0) {
      if (this.props.voter.candidateId !== 0) {
        return <ThankYou name={this.props.voter.name} />;
      }
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
              <h2>{this.props.message}</h2>
            </Col>
          </Row>
          <Row>
            <Col s={12} m={2} />
            <Col s={12} m={8}>
              <form onSubmit={this.onVote}>
                <Table hoverable={true} centered={true} bordered={true}>
                  <thead>
                    <tr>
                      <th data-field="id">Id</th>
                      <th data-field="candidate">Candidate</th>
                      <th data-field="choice">Choice</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.props.candidates.map((row, index) => {
                      return (
                        <tr key={index} style={{ marginBottom: "10px" }}>
                          <td s={4}>{row[0]}</td>
                          <td s={4}>{row[1]}</td>
                          <td s={4}>
                            <label className="container">
                              <input name="vote" type="radio" value={row[0]} />
                              <span className="checkmark" />
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Button
                  waves="light"
                  style={{
                    marginLeft: "40%",
                    marginRight: "40%",
                    marginTop: "40px"
                  }}
                >
                  Submit
                </Button>
              </form>
            </Col>
            <Col s={12} m={2} />
          </Row>
        </div>
      );
    }
    // setTimeout(() => {
    //   this.props.goBack();
    // }, 5000);
    return (
      <Row style={{ margin: "30% 30% 20% 30%" }}>
        {/* <Col s={4} m={12} /> */}
        <Col s={4} >
          <Preloader size="big" />
        </Col>
        <Col s={4} m={12} />
      </Row>
    );
  }
}

export default VotingPage;

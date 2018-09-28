import React, { Component } from "react";
import { Row, Col, Input, Button } from "react-materialize";
// import serializeForm from "form-serialize";

class Enrollment extends Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: "5%" }}>
          <form>
            <Row>
              <Col s={12} m={4} />
              <Col s={12} m={4}>
                <input
                  placeholder="Enter Your Aadhar"
                  label=" Name"
                  name="aadhar"
                  type="number"
                />
              </Col>
              <Col s={12} m={4} />
            </Row>
            <Row>
              <Col s={12} m={4} />
              <Col s={12} m={4}>
                {/* <input type="file" label="File" name="photo" /> */}
              </Col>
              <Col s={12} m={4} />
            </Row>
            <Row>
              {/* <input type="submit" /> */}
              <input onClick={this.redirect()} type="Submit" />
            </Row>
          </form>
        </Row>
      </div>
    );
  }
}

export default Enrollment;

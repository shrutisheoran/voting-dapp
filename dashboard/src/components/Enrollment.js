import React, { Component } from "react";
import { Row, Col, Input, Button } from "react-materialize";
import axios from "axios";

class Enrollment extends Component {
  state = {
    selectedFile: null,
    name: null,
    aadhar: null
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  aadharChangeHandler = event => {
    this.setState({ aadhar: event.target.value });
  };

  nameChangeHandler = event => {
    this.setState({ name: event.target.value });
  };
  uploadHandler = () => {
    const formData = new FormData();
    formData.append(
      "photo",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("aadhar", this.state.aadhar);
    formData.append("name", this.state.name);
    axios
      .post("http://3eec3613.ngrok.io/enroll", formData)
      .then(function(response) {
        console.log(response);
      });
  };

  render() {
    return (
      <div>
        <Row>
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
              <h2>Enter Your Credentials!</h2>
            </Col>
          </Row>
          <Row>
            <Col s={12} m={4} />
            <Col s={12} m={4}>
              <Input
                s={12}
                label="Name"
                type="text"
                value={this.state.name}
                onChange={this.nameChangeHandler}
              />
            </Col>
            <Col s={12} m={2} />
          </Row>
          <Row>
            <Col s={12} m={4} />
            <Col s={12} m={4}>
              <Input
                s={12}
                label="Aadhar"
                name="Aadhar"
                value={this.state.aadhar}
                onChange={this.aadharChangeHandler}
              />
            </Col>
            <Col s={12} m={2} />
          </Row>
          <Row>
            <Col s={12} m={4} />
            <Col s={12} m={4}>
              <Input
                s={12}
                label="File"
                type="file"
                onChange={this.fileChangedHandler}
              />
            </Col>
            <Col s={12} m={2} />
          </Row>
          <Button onClick={this.uploadHandler}>Upload</Button>
        </Row>
      </div>
    );
  }
}

export default Enrollment;

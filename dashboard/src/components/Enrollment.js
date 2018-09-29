import React, { Component } from "react";
import { Row, Col, Input, Button } from "react-materialize";
import axios from "axios";

class Enrollment extends Component {
  state = {
    selectedFile: null,
    name: "",
    aadhar: "",
    qrcode: "",
    heading: "Enter Your Credentials"
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
    axios.post("http://3eec3613.ngrok.io/enroll", formData).then(response => {
      console.log(response);
      this.setState({
        displayqr: true,
        qrcode: response.data.qrcode,
        heading: "Your QR code"
      });
    });
  };

  render() {
    const { displayqr, qrcode, heading } = this.state;
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
              <h2>{heading}</h2>
            </Col>
          </Row>
          {!displayqr ? (
            <div>
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
            </div>
          ) : (
            <div>
              <img src={qrcode} alt="qrcode" title="qrcode" />
              <a href={qrcode} download>
                <Button>Download QR Code</Button>
              </a>
            </div>
          )}
        </Row>
      </div>
    );
  }
}

export default Enrollment;

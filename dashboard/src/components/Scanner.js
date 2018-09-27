import React, { Component } from "react";
import Instascan from "instascan";
import ShowData from "./ShowData";
import { Row, Col } from "react-materialize";

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.videoPrev = React.createRef();
  }

  componentDidMount() {
    let scanner = new Instascan.Scanner({
      video: this.videoPrev.current
    });
    scanner.addListener("scan", content => {
      Object.keys(this.props.voter).length === 0 &&
        this.props.onIdentification(JSON.parse(content));
    });
    Instascan.Camera.getCameras()
      .then(cameras => {
        if (cameras.length > 0) {
          try {
            scanner.start(cameras[0]);
          } catch (error) {
            console.log(error);
            // scanner.start(cameras[0]);
          }
        } else {
          console.error("No cameras found.");
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
  render() {
    const { name, aadhar, voterId } = this.props.voter;
    // console.log(name, aadhar, voterId);
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
            <h2>Scan Your QR code!</h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "5%" }}>
          {Object.keys(this.props.voter).length === 0 && (
            <video ref={this.videoPrev} />
          )}
          {name && (
            <ShowData
              name={name}
              aadhar={aadhar}
              voterId={voterId}
              message="Voter Details!"
            />
          )}
        </Row>
      </div>
    );
  }
}

export default Scanner;

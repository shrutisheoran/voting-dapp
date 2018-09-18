import React, { Component } from "react";
import Instascan from "instascan";
import { Button } from "react-materialize";

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.videoPrev = React.createRef();
  }

  state = {
    data: {}
  };

  componentDidMount() {
    let scanner = new Instascan.Scanner({
      video: this.videoPrev.current
    });
    scanner.addListener("scan", content => {
      console.log(JSON.parse(content));
      this.setState({
        data: JSON.parse(content)
      });
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
    const { name, aadhar, voterId } = this.state.data;
    return (
      <div>
        <video ref={this.videoPrev} />
        {name && (
          <div>
            <h6>Name: {name}</h6>
            <h6>Aadhar number: {aadhar}</h6>
            <h6>Address ID: {voterId}</h6>
            <Button waves="light">Choose Candidate</Button>
          </div>
        )}
      </div>
    );
  }
}

export default Scanner;

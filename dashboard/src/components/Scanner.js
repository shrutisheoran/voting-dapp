import React, { Component } from 'react';
import Instascan from 'instascan';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom'

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
    return (
      <div>
        {Object.keys(this.props.voter).length === 0 && <video ref={this.videoPrev} />}
        {name && (
          <div>
            <h6>Name: {name}</h6>
            <h6>Aadhar number: {aadhar}</h6>
            <h6>Address ID: {voterId}</h6>
            <Link to='/vote'>
              <Button waves="light">Choose Candidate</Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Scanner;

import React, { Component } from "react";
import { Row, Col, Input, Button } from "react-materialize";
import axios from 'axios'

class Enrollment extends Component {

  state = {selectedFile: null}

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadHandler = () => {
    const formData = new FormData()
    formData.append('photo', this.state.selectedFile, this.state.selectedFile.name)
    formData.append('aadhar', 123456)
    axios.post('http://3eec3613.ngrok.io/api/enroll', formData)
      .then(function(response) {
        console.log(response)
      })
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    );
  }
}

export default Enrollment;

import React, { Component } from "react";
import Instascan from "instascan";

let scanner = new Instascan.Scanner({
  video: document.getElementById("preview")
});
scanner.addListener("scan", function(content) {
  console.log(JSON.parse(content));
  document.getElementById("data").innerHTML = content;
});

class Scanner extends Component {
  state = {
    data: {}
  };
  render() {
    Instascan.Camera.getCameras()
      .then(function(cameras) {
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
      .catch(function(e) {
        console.error(e);
      });
    return (
      <div>
        <video id="preview" />
        <p id="data" />
      </div>
    );
  }
}

export default Scanner;
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Scanner from "./components/Scanner";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Route exact path="/scan" render={() => <Scanner />} />
      </div>
    );
  }
}

export default App;

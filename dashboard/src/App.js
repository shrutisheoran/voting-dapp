import React, { Component } from "react";
import "./App.css";
import Scanner from "./components/Scanner";
import Dashboard from "./components/Dashboard";
import { Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import VotingPage from "./components/VotingPage";
import * as api from "./utils/utils";
// import Thankyou from './components/Thankyou'

class App extends Component {
  state = {
    voter: {},
    candidates: {}
  };

  componentDidMount() {
    api.getCandidates().then(candidates => {
      this.setState({ candidates });
    });
  }

  onIdentification = voter => {
    this.setState({
      voter: {
        ...voter,
        candidateId: 0
      }
    });
  };

  onVote = id => {
    this.setState(
      {
        voter: {
          ...this.state.voter,
          candidateId: id
        }
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <FrontPage />} />
        <Route
          exact
          path="/scan"
          render={() => (
            <Scanner
              voter={this.state.voter}
              onIdentification={voter => this.onIdentification(voter)}
            />
          )}
        />
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route path="/news" render={() => <News />} />
        <Route path="/enrollment" render={() => <Enrollment />} />
        <Route
          path="/vote"
          render={({ history }) => (
            <VotingPage
              goBack={() => history.push("/scan")}
              vote={candidateId => this.onVote(candidateId)}
              voter={this.state.voter}
              candidates={this.state.candidates}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

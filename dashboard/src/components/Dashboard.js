import React, { Component } from "react";
import { Table, tbody, thead, td, th, tr } from "react-materialize";
import Chart from "react-google-charts";
import { Row, Col } from "react-materialize";
import * as api from "../utils/utils";

class Dashboard extends Component {
  state = {};

  componentWillMount() {
    api.getVotes().then(data => {
      this.setState({ data });
      let d = data.map(i => [i[1], i[2]]);
      d.unshift(["Candidate", "Votes"]);
      this.setState({ d });
    });
  }

  render() {
    const { data, d } = this.state;
    // console.log(data);
    const options = {
      title: "Voting Results",
      pieHole: 0.5
    };
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
            <h2>Voting Results</h2>
          </Col>
        </Row>
        <Row className="dashboard">
          <Col s={12} m={6} style={{ marginTop: "7%" }}>
            <Table hoverable={true} centered={true} bordered={true}>
              <thead>
                <tr>
                  <th data-field="id">Id</th>
                  <th data-field="candidate">Candidate</th>
                  <th data-field="votes">Votes</th>
                </tr>
              </thead>

              <tbody>
                {data &&
                  data.map((row, index) => (
                    <tr key={index}>
                      {row.map((item, index) => (
                        <td key={index}>{item}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          {data && (
            <Col m={6} s={12}>
              <Chart
                chartType="PieChart"
                style={{ marginTop: "10%" }}
                width="100%"
                height="400px"
                data={d}
                options={options}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Dashboard;

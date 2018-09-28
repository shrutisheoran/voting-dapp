import React, { Component } from "react";
import { Row, Preloader, Col, Card, CardTitle } from "react-materialize";

class News extends Component {
  state = {
    data: {}
  };
  componentWillMount() {
    fetch(
      "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=52dea1c96275422c9d9d32ac02eb3eae"
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ data: data });
      });
  }
  render() {
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
              <h2>Related News!</h2>
            </Col>
          </Row>
        <Row>
          {Object.keys(this.state.data).length === 0 && (
            <Row style={{ margin: "20% 0% 20% 40%" }}>
              <Col s={4} m={12} />
              <Col s={4}>
                <Preloader size="big" />
              </Col>
              <Col s={4} m={12} />
            </Row>
          )}
          {Object.keys(this.state.data).length !== 0 && (
            <Row>
              <Col s={12} m={4} />
              <Col s={12} m={8}>
                <ul>
                  {this.state.data.articles.map((e, index) => {
                    return (
                      <li key={index}>
                        <Col m={7} s={12}>
                          <Card
                            horizontal
                            header={<CardTitle image={e.urlToImage} />}
                            actions={[
                              <a href={e.url}>Wanna Read More! Click here</a>
                            ]}
                          >
                            <p>{e.title}</p>
                          </Card>
                        </Col>
                      </li>
                    );
                  })}
                </ul>
              </Col>
              {/* <Col s={12} m={2} /> */}
            </Row>
          )}
        </Row>
      </div>
    );
  }
}

export default News;

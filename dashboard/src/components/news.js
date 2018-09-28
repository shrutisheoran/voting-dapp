import React, { Component } from "react";

class News extends Component {
  state = {
    data: {}
  };
  componentDidMount() {
    fetch(
      "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=52dea1c96275422c9d9d32ac02eb3eae&q=election"
    )
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  render() {
    return (
      <div>
        <ul>
          <li>{this.state.data.articles.title}</li>
        </ul>
      </div>
    );
  }
}

export default News;

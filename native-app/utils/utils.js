const apiURL = "https://3eec3613.ngrok.io";

const headers = {
  Accept: "application/json"
};

export const getCandidates = () =>
  fetch(`${apiURL}/candidates`, { headers }).then(res => res.json());

// componentDidMount() {
//   api.getVotes().then(data => this.setState({data}));
// }

export const getVotes = () =>
  fetch(`${apiURL}/votecount`, { headers }).then(res => res.json());

export const postVote = (voterId, aadhar, candidateId) =>
  fetch(`${apiURL}/vote`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      voterId,
      aadhar,
      candidateId
    })
  })
    .then(res => res.json())
    .catch(err => err);

// api
// .postVote("0x047CF52123f597E78311A790d2a71E5fA260Fbb8", 12345678, 1)
// .then(res => console.log(res));

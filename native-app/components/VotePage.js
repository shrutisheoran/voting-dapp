import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import { purple, white } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../utils/utils";

export default class VotePage extends Component {
  state = {
    votes: true,
    value: 0,
    submit: false
  };

  onVote = () => {
    const id = this.state.value;
    const voter = this.props.navigation.getParam("voter");
    if (id === 0) alert("Please VOTE!!");
    else {
      this.setState({ submit: true });
      api.postVote(voter.voterId, voter.aadhar, id).then(res => {
        if(res.error)
            alert("You've already voted!");
        console.log(JSON.stringify(res, null, 4) + "RESSSSSSSSSSSS");
      });
    }
  };

  onSelection = value => {
    this.setState({ value });
    this.setState({ votes: false });
  };

  onReset = () => {
    this.setState({ votes: true });
    this.setState({ value: 0 });
  };

  render() {
    const candidates = this.props.navigation.getParam("candidates");
    if (this.state.submit) {
      setTimeout(() => {
        this.props.navigation.navigate("Home", {
          candidates
        });
      }, 2000);
      return (
        <View>
          <View
            style={[styles.header, { alignItems: "flex-start", height: "15%" }]}
          >
            <TouchableOpacity
              style={{ marginLeft: "5%" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Ionicons
                name="ios-arrow-back-outline"
                color={"white"}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", marginTop: "45%" }}>
            <Text style={{ fontSize: 30, fontFamily: "FjallaOne" }}>
              Thankyou!! We got your vote.
            </Text>
          </View>
        </View>
      );
    } else
      return (
        <View>
          <View style={[styles.header, { alignItems: "flex-start" }]}>
            <TouchableOpacity
              style={{ marginLeft: "5%" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Ionicons
                name="ios-arrow-back-outline"
                color={"white"}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <List>
            {candidates.map(elem => (
              <ListItem thumbnail key={elem[0]}>
                <Left>
                  <Thumbnail square source={{ uri: elem[2] }} />
                </Left>
                <Body>
                  <Text>{elem[1]}</Text>
                  <Text note numberOfLines={1}>
                    CandidateId: {elem[0].toString()}
                  </Text>
                </Body>
                <Right>
                  {this.state.votes ? (
                    <Button
                      transparent
                      onPress={() => this.onSelection(elem[0])}
                    >
                      <Text style={{ fontFamily: "FjallaOne" }}>Vote</Text>
                    </Button>
                  ) : (
                    <Text />
                  )}
                </Right>
              </ListItem>
            ))}
          </List>
          <View style={styles.btnView}>
            {this.state.value ? (
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  { marginRight: "5%", marginLeft: "-17%" }
                ]}
                onPress={this.onReset}
              >
                <Text style={styles.submitBtnText}>Reset</Text>
              </TouchableOpacity>
            ) : (
              <Text />
            )}
            <TouchableOpacity style={styles.submitBtn} onPress={this.onVote}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  btnView: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "35%"
  },
  header: {
    backgroundColor: purple,
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 15,
    fontFamily: "FjallaOne",
    textAlign: "center"
  }
});

import React, { Component } from "react";
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { Card } from 'native-base'
import { purple, white } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'

export default class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null
  };

  componentDidMount() {
    const candidates = this.props.navigation.getParam("candidates");
    setTimeout(() => {
      this.props.navigation.navigate("VotePage", {
        candidates,
        voter: {
          name: 'Saurabh Thakur',
          voterId: '13245364758',
          aadharId: '1425367589',
        }
      });
    }, 500);
    // this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      const candidates = this.props.navigation.getParam("candidates");
      // const voter = this.props.navigation.getParam("voter");
      this.setState({ lastScannedUrl: result.data });
      this.props.navigation.goBack();
      this.props.navigation.navigate("VotePage", {
        candidates,
        voter: result.data
      });
    }
  };

  render() {

    return (
      <View style={styles.container}>
        <View style={[styles.header, { flexDirection: 'row',}]}>
          <TouchableOpacity style={{marginLeft: '-47%', marginRight: '10%', width: '5%'}} onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                  name='ios-arrow-back-outline'
                  color={'white'}
                  size={30} 
              />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{ fontFamily: 'FjallaOne', fontSize: 20, color: white}}>Scan You VoterID</Text>
          </View>
        </View>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width
            }}
          />
        )}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      "Open this URL?",
      this.state.lastScannedUrl,
      [
        {
          text: "Yes",
          onPress: () => Linking.openURL(this.state.lastScannedUrl)
        },
        { text: "No", onPress: () => {} }
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000"
  },
  header: {
    backgroundColor: purple,
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    flexDirection: "row"
  },
  url: {
    flex: 1
  },
  urlText: {
    color: "#fff",
    fontSize: 20
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  cancelButtonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 18
  }
});

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
import { Camera, Permissions } from "expo";
import { purple, white } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'

export default class Scanner extends Component {
  state = {
    text: 'Scan your voterId (QR Code)',
    hasCameraPermission: null,
    lastScannedUrl: null,
    uri: null,
  };

  componentDidMount() {
    const candidates = this.props.navigation.getParam("candidates");
    // setTimeout(() => {
    //   this.props.navigation.navigate("TakePicture", {
    //     candidates,
    //     voter: {
    //       name: 'Saurabh Thakur',
    //       voterId: '13245364758',
    //       aadhar: '1425367589',
    //     },
    //   });
    // }, 200);
    this._requestCameraPermission();
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
      this.setState({
        lastScannedUrl: result.data,
        text: 'Click Your Photograph' 
      });
      // this.props.navigation.goBack();
      // console.log(result.data);
    }
  };

  takePicture = async function() {
    if (this.camera) {
      console.log("Taking Picture");
      await this.camera.takePictureAsync()
      .then((result) => {
        // this.setState({uri: result.uri})
        console.log(result);
        if(this.state.lastScannedUrl) {
          const candidates = this.props.navigation.getParam("candidates");
          const obj = this.state.lastScannedUrl;
          const voter = {
            name: obj.name,
            aadhar: obj.aadhar,
            voterId: obj.voterId
          }
          console.log(voter)
          this.props.navigation.navigate("VotePage", {
            candidates,
            voter
          });
        }
      })
      .catch((err) => console.log(err));
    }
  }

  render() {
    // if(this.state.uri!=null) {
    //   return (
    //     <Image style={{height: 400, width: 400}} source={{uri: this.state.uri}}/>
    //   )
    // }
    // else
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
            <Text style={{ fontFamily: 'FjallaOne', fontSize: 20, color: white}}>{this.state.text}</Text>
          </View>
        </View>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
          // <BarCodeScanner
          //   onBarCodeRead={this._handleBarCodeRead}
          // />
          <View style={{flex: 1}}>
              <Camera 
                type={Camera.Constants.Type.front}
                style={{
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width
                }}
                ref={ref => { this.camera = ref; }}
                onBarCodeScanned={(result) => this._handleBarCodeRead(result)}
              />
          </View>
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
        <TouchableOpacity style={styles.submitBtn} onPress={() => this.takePicture()}>
            <Text style={styles.submitBtnText}>Click</Text>
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
  submitBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
      color: white,
      fontSize: 15,
      fontFamily: 'FjallaOne',
      textAlign: 'center'
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

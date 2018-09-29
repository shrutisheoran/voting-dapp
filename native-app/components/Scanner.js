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
import { Camera, Permissions, AppLoading} from "expo";
import { purple, white } from '../utils/colors'
import { Spinner } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

export default class Scanner extends Component {
  state = {
    text: 'Scan your voterId (QR Code)',
    hasCameraPermission: null,
    lastScannedUrl: null,
    loader: false,
    showData: false
  };

  componentDidMount() {
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
        text: 'Click Your Photograph',
        showData: true,
      });
    }
  };

  uploadPicture = (uri, aadhar) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('aadhar', aadhar )
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://3eec3613.ngrok.io/verify', formData)
      .then((res) => {
        const confidence = res.data.images[0].transaction.confidence
        this.setState({loader: false})
        if(confidence>=0.6) {
          const candidates = this.props.navigation.getParam("candidates");
          const obj = this.state.lastScannedUrl;
          const voter = JSON.parse(obj);
          console.log("In Scanner")
          console.log(candidates, voter);
          this.props.navigation.navigate("VotePage", {
            candidates,
            voter
          });
        }
        else {
          alert("Sorry, picture not recognised.Please click again")
        }
      })
      .catch((err) => console.log(err))
  }

  takePicture = async function () {
    if (this.camera) {
      console.log("Taking Picture");
      await this.camera.takePictureAsync()
        .then((result) => {
          this.setState({loader: true});
          const obj = this.state.lastScannedUrl;
          const voter = JSON.parse(obj);
          this.uploadPicture(result.uri, voter.aadhar);
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    if(this.state.loader)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontFamily: 'FjallaOne', fontSize: 30}}>Processing...</Text>
            <Spinner color='red' />
          <Text style={{fontFamily: 'FjallaOne', fontSize: 30}}>Please wait!</Text>
        </View>
      )
    else
      return (
        <View style={styles.container}>
          <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <TouchableOpacity style={{ marginLeft: '5%', width: '5%' }} onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name='ios-arrow-back-outline'
                color={'white'}
                size={30}
              />
            </TouchableOpacity>
            <View style={{ marginRight: '18%', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'FjallaOne', fontSize: 20, color: white }}>{this.state.text}</Text>
            </View>
          </View>
          {this.state.hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
          ) : this.state.hasCameraPermission === false ? (
            <Text style={{ color: "#fff" }}>
              Camera permission is not granted
            </Text>
          ) : (
                <View style={{ flex: 1 }}>
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
        { text: "No", onPress: () => { } }
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
    const { name, voterId, aadhar } =  JSON.parse(this.state.lastScannedUrl)
    return (
      <View style={styles.bottomBar}>
        {this.state.showData
        ?<View style={{marginBottom: '0%', paddingBottom: '0%'}}>
          <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
            <Text style={styles.urlText}>Name: { name }</Text>
            <Text style={styles.urlText}>AadharId: { aadhar }</Text>
            <Text style={styles.urlText}>VoterId: { voterId }</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => this.setState({showData: false})}
          >
          <Text style={[styles.submitBtnText]}>Recognise Yourself</Text>
          </TouchableOpacity>
        </View>
        :<TouchableOpacity style={styles.submitBtn} onPress={() => this.takePicture()}>
          <Text style={styles.submitBtnText}>Click</Text>
        </TouchableOpacity>
        }
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
    marginBottom: '0%',
    paddingBottom: '0%',
    backgroundColor: purple,
    flex: 1,
    borderRadius: 2,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 25,
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

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
import { Camera } from "expo";
import { purple, white } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'

export default class Scanner extends Component {
    state = {
        hasCameraPermission: "granted",
        photoId: 1,
        uri: null,
    };

    componentDidMount() {
        const candidates = this.props.navigation.getParam("candidates");
        const voter = this.props.navigation.getParam("voter");
    }

    takePicture = async function() {
        console.log("Taking Picture");
        setTimeout(() => {
            console.log("Took Picture");
        }, 5000);
        if (this.camera) {
            await this.camera.takePictureAsync()
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
            const candidates = this.props.navigation.getParam("candidates");
            const voter = this.props.navigation.getParam("voter");
            this.props.navigation.navigate("VotePage", {
                candidates,
                voter
            });
            // let resizedPhoto = await ImageManipulator.manipulate(
            //     photo.uri,
            //     [{ resize: { width: 108, height: 192 } }],
            //     { compress: 0, format: "jpg", base64: false }
            // );
            // FileSystem.moveAsync({
            //     from: resizedPhoto.uri,
            //     to: `${FileSystem.documentDirectory}photos/Photo_${
            //         this.state.photoId
            //     }.jpg`
            // });
            // this.setState({ photoId: this.state.photoId + 1 });
            // Vibration.vibrate(); 
       
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
                <Text style={{ fontFamily: 'FjallaOne', fontSize: 20, color: white}}>Face Recognition</Text>
            </View>
            </View>
            {this.state.hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
            ) : this.state.hasCameraPermission === false ? (
            <Text style={{ color: "#fff" }}>
                Camera permission is not granted
            </Text>
            ) : (
                <View style={{flex: 1}}>
                    <Camera style={{height: '80%', width: '100%'}} ref={ref => { this.camera = ref; }}/>
                    <TouchableOpacity style={styles.submitBtn} onPress={() => this.takePicture()}>
                        <Text style={styles.submitBtnText}>Recognise Yourself</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        );
    }
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
        marginTop: 20,
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

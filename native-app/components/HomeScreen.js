import React from 'react'
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { purple, white, gray } from '../utils/colors'
import { RkCard } from 'react-native-ui-kitten'

export default class HomeScreen extends React.Component {
  state = {
    candidates: [
      [
          1,
          "Candidate 1",
          4000,
          "https://images.vexels.com/media/users/3/136532/isolated/preview/93b5c734e3776dd11f18ca2c42c54000-owl-round-icon-by-vexels.png"
        ],
        [
          2,
          "Candidate 2",
          6000,
          "http://clipart-library.com/images/LTdojebac.jpg"
        ],
        [
          3,
          "Candidate 3",
          10000,
          "https://cdn4.iconfinder.com/data/icons/school-education-14/512/Icon_51-512.png"
        ],
        [
          4,
          "Candidate 4",
          3000,
          "https://images-na.ssl-images-amazon.com/images/I/51Mwpo7I72L._SX425_.jpg"
        ]
    ]
  }
  render() {
    const { candidates } = this.props.screenProps

    return (
      <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('Scanner', {
            candidates
          })}
        >
          <RkCard>
            <ImageBackground style={{height: '100%', width: '100%'}} resizeMode='cover' source={require('../img/icon.jpg')}>
              <View rkCardHeader style={{marginTop: '68%'}}>
                <Text style={{fontFamily: 'FjallaOne', fontSize: 30, color: '#23395B'}}>Vote</Text>
              </View>
            </ImageBackground>
          </RkCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('Dashboard', {
            candidates: this.state.candidates
          })}
        >
          <RkCard>
            <ImageBackground style={{height: '100%', width: '100%'}} resizeMode='cover'source={require('../img/m1.png')}>
              <View rkCardHeader style={{marginTop: '68%'}}>
                <Text style={{fontFamily: 'FjallaOne', fontSize: 30, color: white}}>Dashboard</Text>
              </View>
            </ImageBackground>
          </RkCard>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '85%',
    margin: 20,
    marginBottom: 5,
    height: 300,
  }
});
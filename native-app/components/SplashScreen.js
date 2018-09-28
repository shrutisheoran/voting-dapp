import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'

export default class SplashScreen extends React.Component {
  render() {
    const { candidates } = this.props.screenProps

    setTimeout(() => {
        this.props.navigation.navigate('HomeScreen', {
            candidates,
        })
    }, 1000)

    return (
      <View style={styles.container}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('HomeScreen', {
                candidates
            })}>
            <Image style={{height: 800, width: 500}} source={require('../img/s1.jpg')}/>
            </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
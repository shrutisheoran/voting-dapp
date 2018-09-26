import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { purple, white, gray } from '../utils/colors'
import { RkCard } from 'react-native-ui-kitten'

export default class HomeScreen extends React.Component {
  render() {
    const { candidates, voter, onVote } = this.props.screenProps

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{color: white, fontSize: 25, marginBottom: -10}}>Vote India!</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('VotePage', {
            candidates,
            voter,
            onVote
          })}
        >
          <RkCard>
            <View rkCardHeader>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Vote</Text>
            </View>
            <Image rkCardImg style={{height: 100}} source={require('../img/w4.jpg')}/>
            <View rkCardContent>
              <Text style={{fontWeight: 'bold'}}>Click here to Vote!</Text>
            </View>
          </RkCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('Dashboard', {
            candidates
          })}
        >
          <RkCard>
            <View rkCardHeader>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Dashboard</Text>
            </View>
            <Image rkCardImg style={{height: 100}} source={require('../img/w3.jpg')}/>
            <View rkCardContent>
              <Text style={{fontWeight: 'bold'}}>Click here to see results!</Text>
            </View>
          </RkCard>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: purple,
    height: 70,
    width: 500,
    marginTop: -50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: 300,
    margin: 5,
    height: 250,
  }
});
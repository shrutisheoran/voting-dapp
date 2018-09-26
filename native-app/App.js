import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStackNavigator} from 'react-navigation'
import Scanner from './components/Scanner'
import Dashboard from './components/Dashboard'
import HomeScreen from './components/HomeScreen'
import SplashScreen from './components/SplashScreen'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import VotePage from './components/VotePage'

function AppStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      header: null,
    },
  },
  VotePage: {
    screen: VotePage,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null,
    }
  },
})

export default class App extends React.Component {
  state = {
    candidates: [
      [
        "1",
        "Candidate 1",
        "https://images.vexels.com/media/users/3/136532/isolated/preview/93b5c734e3776dd11f18ca2c42c54000-owl-round-icon-by-vexels.png"
      ],
      [
        "2",
        "Candidate 2",
        "http://clipart-library.com/images/LTdojebac.jpg"
      ],
      [
        "3",
        "Candidate 3",
        "https://cdn4.iconfinder.com/data/icons/school-education-14/512/Icon_51-512.png"
      ],
      [
        "4",
        "Candidate 4",
        "https://images-na.ssl-images-amazon.com/images/I/51Mwpo7I72L._SX425_.jpg"
      ]
    ],
    voter: {}
  }

  onIdentification = (voter) => {
    this.setState({
      voter: {
        ...voter,
        candidateId: 0,
      }
    });
  }

  onVote = (id) => {
    this.setState({
      voter: {
        ...this.state.voter,
        candidateId: id
      }
    }, () => console.log(this.state));
  }

  render() {
    const { candidates, voter } = this.state
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={purple} barStyle='light-content'/>
        <MainNavigator screenProps={{
          candidates: this.state.candidates,
          voter: this.state.voter,
          onVote: (id) => this.onVote(id),
          onIdentification: (voter) => this.onIdentification(voter)
        }}/>
      </View>
    );
  }
}
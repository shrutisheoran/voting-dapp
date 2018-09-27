import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { purple, gray, orange, white } from '../utils/colors';
import { RkTheme } from 'react-native-ui-kitten';
import DoughnutChart from './DoughnutChart'

export default class Dashboard extends Component{
    state = {
        candidates: [
            [
                "1",
                "Candidate 1",
                "0",
                "https://images.vexels.com/media/users/3/136532/isolated/preview/93b5c734e3776dd11f18ca2c42c54000-owl-round-icon-by-vexels.png"
              ],
              [
                "2",
                "Candidate 2",
                "1",
                "http://clipart-library.com/images/LTdojebac.jpg"
              ],
              [
                "3",
                "Candidate 3",
                "0",
                "https://cdn4.iconfinder.com/data/icons/school-education-14/512/Icon_51-512.png"
              ],
              [
                "4",
                "Candidate 4",
                "1",
                "https://images-na.ssl-images-amazon.com/images/I/51Mwpo7I72L._SX425_.jpg"
              ]
        ]
    }
    render() {
        const { candidates } = this.state
        const colors = ['#ff6b5d', '#8b98ff', '#c2d521', '#ffd147']
        const chartData = candidates.map((candidate, index) => ({
            x: candidate[0],
            y: candidate[2],
            title: `${candidate[1]}: ${candidate[2]}`,
            name: candidate[1],
            color: colors[index],
        }));
        return (
            <ScrollView>
                <DoughnutChart data={chartData}/>
                <List>
                    {
                        candidates.map((elem) => (
                            <ListItem thumbnail key={elem[0]}>
                                <Left>
                                <Thumbnail square source={{ uri: elem[3] }} />
                                </Left>
                                <Body>
                                <Text>{elem[1]}</Text>
                                <Text note numberOfLines={1}>CandidateId: {elem[0]}</Text>
                                </Body>
                                <Right>
                                    <Text>Votes: {elem[2]}</Text>
                                </Right>
                            </ListItem>
                        ))
                    }
                </List>
            </ScrollView>
        )
    }
}

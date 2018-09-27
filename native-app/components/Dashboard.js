import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { purple, gray, orange, white } from '../utils/colors';

export default class Dashboard extends Component{
    state = {
        candidates: []
    }
    componentDidMount() {
        this.setState({candidates: this.props.navigation.getParam('candidates')});
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

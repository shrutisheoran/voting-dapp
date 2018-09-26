import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { purple, white } from '../utils/colors'
import { EvilIcons } from '@expo/vector-icons'

export default class VotePage extends Component {
    state = {
        votes: [],
        value: 0,
        text: 'Vote',
    }
    componentDidMount() {
        const candidates = this.props.navigation.getParam('candidates')
        this.setState({votes: candidates.map((c) => ({[c[0]]: true}))})
    }

    onVote = () => {
        if (this.state.value === 0)
            alert("Please VOTE!!")
        else {
            this.props.navigation.getParam('onVote')(this.state.value)
            this.props.navigation.goBack()
        }
    }

    onSelection = (value) => {
        this.setState({value})
        this.setState((state) => ({
            votes: state.votes.map((elem) => {
                const id = Object.keys(elem)[0];
                return id!==value ? {[id]: false}: {[id]: true}
            })
        }))
    }

    onReset = () => {
        this.setState((state) => ({
            votes: state.votes.map((elem) => ({[Object.keys(elem)[0]]: true}))
        }))
        this.setState({value: 0})
    }

    display = (id) => {
        const obj = this.state.votes.filter((vote) => Object.keys(vote)[0]===id)[0];
        return obj? obj[id] : false
    }

    render() {
        const candidates = this.props.navigation.getParam('candidates')
        return (
            <View>
                <List>
                    {
                        candidates.map((elem) => (
                            <ListItem thumbnail key={elem[0]}>
                                <Left>
                                <Thumbnail square source={{ uri: elem[2] }} />
                                </Left>
                                <Body>
                                <Text>{elem[1]}</Text>
                                <Text note numberOfLines={1}>CandidateId: {elem[0]}</Text>
                                </Body>
                                <Right>
                                    {
                                        this.display(elem[0])
                                        ?<Button transparent onPress={() => this.onSelection(elem[0])}>
                                            <Text>{this.state.text}</Text>
                                        </Button>
                                        : <Text></Text>
                                    }
                                </Right>
                            </ListItem>
                        ))
                    }
                </List>
                <View style={styles.btnView}>
                    {
                        this.state.value
                        ? <TouchableOpacity style={[styles.submitBtn, {marginRight: '5%', marginLeft: '-17%'}]} onPress={this.onReset}>
                            <Text style={styles.submitBtnText}>Reset</Text>
                        </TouchableOpacity>
                        : <Text></Text>
                    }
                    <TouchableOpacity style={styles.submitBtn} onPress={this.onVote} >
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '35%'
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
        textAlign: 'center'
    },
    resetBtn: {
        marginTop: 20,
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 2,
        height: 40,
        marginRight: '5%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
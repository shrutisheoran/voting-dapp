import React, { Component } from 'react'
import { View, Text, StyleSheet, SectionList} from 'react-native'
import { purple, gray, orange, white } from '../utils/colors';

export default class Dashboard extends Component{
    state = {
        candidates: [
            [
                "1",
                "Candidate 1",
                "0"
            ],
            [
                "2",
                "Candidate 2",
                "1"
            ],
            [
                "3",
                "Candidate 3",
                "0"
            ],
            [
                "4",
                "Candidate 4",
                "1"
            ],
            [
                "5",
                "Candidate 5",
                "0"
            ],
            [
                "6",
                "Candidate 6",
                "1"
            ]
        ]
    }
    render() {
        const { candidates } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <SectionList style={styles.list}
                    renderItem={({item, index, section}) => <Text   style={styles.listItem} key={index}>{item}</Text>}
                    renderSectionHeader={({section: {title}}) => (
                        <Text  style={[styles.listHeader]}>{title}</Text>
                    )}
                    sections={
                        candidates.map((item) => ({
                            title: item[1], data: [`CandidateId: ${item[0]}     Votes: ${item[2]}`]
                        }))
                    }
                    keyExtractor={(item, index) => item + index}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: white,
    },
    header: {
        backgroundColor: purple,
        height: 70,
        width: 500,
        marginTop: -30,
    },
    list: {
        margin: 10,
    },
    listHeader: {
        padding: 5,
        backgroundColor: '#edf4ff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    listItem: {
        padding: 5,
        backgroundColor: '#edf4ff',
        marginBottom: 10
    }
})

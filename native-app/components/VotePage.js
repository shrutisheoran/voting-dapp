import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { purple, white, gray } from '../utils/colors';
import RadioGroup from 'react-native-custom-radio-group';
 
export default class VotePage extends Component {
    state = {
        value: 0,
    }

    onVote = () => {
        if(this.state.value === 0) 
            alert("Please VOTE!!")
        else {
            this.props.navigation.getParam('onVote')(this.state.value)
            this.props.navigation.goBack()
        }
    }

    render() {
        console.log(this.state.value);
        const candidates = this.props.navigation.getParam('candidates')
        const voter = this.props.navigation.getParam('voter')
        const radioGroupList = candidates.map((elem) => ({
            label: `${elem[1]}`,
            value: elem[0],
        }));
        //<Image style={{width:50, height:50, borderRadius: 25}} source={{uri: elem[2]}}/>
        return (
            <View style={styles.container}>
                <RadioGroup
                    radioGroupList={radioGroupList}
                    onChange={(value) => this.setState({value})}
                    containerStyle={{flexDirection: 'column', alignItems: 'center', padding: 5}}
                    buttonContainerStyle={{
                        width: '100%',
                        marginTop: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 10, height: 10 },
                        shadowOpacity: 0.8,
                        shadowRadius: 50,
                    }}
                    // buttonTextStyle={{}}
                    buttonContainerActiveStyle={{borderColor: '#50C878', borderRadius: 0, backgroundColor: '#33cc33'}}
                    buttonContainerInactiveStyle={{
                        borderColor: '#fff',
                        borderRadius: 0,
                    }}
                    buttonTextActiveStyle={{
                        fontSize: 20,
                        fontWeight: '100'
                    }}
                    buttonTextInactiveStyle={{color: purple}}
                />
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.onVote}
                    >
                        <Text style={styles.submitBtnText}>VOTE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    radioContainer: {
        flexDirection: 'column',
        paddingTop: 5,
        width: '96%',
        marginLeft: '2%'
    },
    btns: {
        backgroundColor: white,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 50,
    },
    buttonStyle: {
        marginTop: 13,
        marginRight: 20
    },
    labelStyle: {
        marginRight: 20
    },
    btnView: {
        alignItems: 'center',
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
})

{/* <RadioForm style={styles.radioButton}
                    // formHorizontal={true}
                    animation={true}
                >
                    {candidates.map((elem) => (
                        <View style={styles.box} key={elem[0]} >
                        <RadioButton style={styles.btns} labelHorizontal={true} >
                            <RadioButtonInput
                                obj={{label: elem[1], value: elem[0]}}
                                index={elem[0]}
                                isSelected={this.state.value === elem[0]}
                                onPress={(value) => this.setState({value})}
                                borderWidth={1}
                                buttonInnerColor={ purple }
                                buttonOuterColor={ '#000' }
                                buttonSize={15}
                                buttonOuterSize={20}
                                buttonStyle={styles.buttonStyle}
                                buttonWrapStyle={{marginLeft: 10}}
                            />
                            <RadioButtonLabel
                                obj={{label: elem[1], value: elem[0]}}
                                index={elem[0]}
                                onPress={(value) => this.setState({value})}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 20, color: '#000'}}
                                labelWrapStyle={styles.labelStyle}
                            />
                            <Image style={{width:50, height:50, borderRadius: 25}} source={{uri: elem[2]}}/>
                        </RadioButton>
                        </View>
                    ))}
                </RadioForm> */}
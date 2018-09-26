import React, { Component } from 'react'
import { Row, Col, Input, Preloader } from 'react-materialize'
import serializeForm from 'form-serialize'

class VotingPage extends Component {
    onVote = (e) => {
        e.preventDefault();
        const value = serializeForm(e.target, { hash: true } ).vote;
        !value ? alert("Please VOTE!!") : this.props.vote(value);
    }
    render() {
        if(Object.keys(this.props.voter).length>0) {
            if(this.props.voter.candidateId !== 0) {
                return (
                    <div>We got your vote. Thanks for voting.</div>
                )
            }
            return (
                <form onSubmit={this.onVote}>
                {
                    this.props.candidates.map((row, index) => {
                        return (
                            <Row key={index}>
                                <Col s={4}>{row[0]}</Col>
                                <Col s={4}>{row[1]}</Col>
                                <Col s={4}>
                                    <Input name='vote' type='radio' value={row[0]}/><br/><br/>
                                </Col>
                            </Row>
                        )
                    })
                }
                <input type='submit' value='Submit'/>
                </form>
            )
        }
        setTimeout(() => { this.props.goBack() }, 5000);
        return (
            <Row>
                <Col s={4}></Col>
                <Col s={4}>
                    <Preloader size='big'/>
                </Col>
                <Col s={4}></Col>
            </Row>
        )
    }
}

export default VotingPage
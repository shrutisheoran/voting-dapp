import React, { Component } from 'react'
import { Table, tbody, thead, td, th, tr } from 'react-materialize'

class Dashboard extends Component {
    state = [
        [
            "1",
            "Candidate 1",
            "0"
        ],
        [
            "2",
            "Candidate 2",
            "1"
        ]
    ]
    render() {
        return (
            <div className='dashboard'>
                <Table hoverable={true}>
                    <thead>
                        <tr>
                        <th data-field="id">Id</th>
                        <th data-field="candidate">Candidate</th>
                        <th data-field="votes">Votes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.map((row, index) => (
                                <tr key={index}>
                                {row.map((item, index) => <td key={index}>{item}</td>)}
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Dashboard
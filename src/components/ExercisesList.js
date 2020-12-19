import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Exercise from './Exercise';

class ExercisesList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exercises: []
        }
    }

    deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }


    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data
                })
            })
            .catch(err => console.log(err))

    }
    render() {
        console.log(this.state.exercises);
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.exercises.map(exercise => (
                                <Exercise key={exercise.id} exercise={exercise} deleteExercise={this.deleteExercise} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList;

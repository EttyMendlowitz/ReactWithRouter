import React from 'react';
import axios from 'axios';

class AddCar extends React.Component {

    state = {
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        car: {
            make: '',
            model: '',
            year: '',
            personId: 0
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getpersonbyid?id=${id}`);
        this.setState({ person: data, car: { personId: id } });

    }

    onTextChange = e => {

        const copy = { ...this.state.car };
        copy[e.target.name] = e.target.value;
        this.setState({ car: copy });
    }

    onSubmitClick = async () => {
        await axios.post('/api/people/addcar', this.state.car);
        this.props.history.push('/');
    }

    render() {
        const { make, model, year } = this.state.car;
        const {firstName, lastName} = this.state.person;
        return (<div className="row">
            <div className="col-md-6 offset-md-3 card bg-light p-4">
                <h2>Add a car for {firstName} {lastName}</h2>
                <input type="text" className="form-control" name="make" onChange={this.onTextChange}placeholder="Make" value={make} />
                <br />
                <input type="text" className="form-control" name="model" onChange={this.onTextChange} placeholder = "Model" value={model} />
                <br />
                <input type="text" className="form-control" name="year" onChange={this.onTextChange} placeholder = "Year" value={year} />
                <br />
                <button className="btn btn-primary btn-lg btn-block" onClick={this.onSubmitClick}>Submit</button>
            </div>
        </div>)
    }
}

export default AddCar;

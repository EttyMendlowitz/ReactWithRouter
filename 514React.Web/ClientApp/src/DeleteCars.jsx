import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DeleteCars extends React.Component {

    state = {
        personId: 0,
        cars: [],
        searchBox: '',
        searchedCars: []
    }

    onSearchBoxChange = e => {
        const searchBox = e.target.value;
        this.setState({ searchBox });
        let searchedCars;
        if (searchBox) {

             searchedCars = this.state.cars.filter(c => c.make.toLowerCase().includes(searchBox.toLowerCase()) || c.model.toLowerCase().includes(searchBox.toLowerCase()));
        }
        else {
            searchedCars = this.state.cars;
        }
        this.setState({ searchedCars })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getcarsforid?id=${id}`);
        this.setState({ cars: data, searchedCars: data, personId: id });

    }

    onClearClick = () => {
        this.setState({searchBox: '', searchedCars: this.state.cars})
    }

    onDeleteClick = async() => {
        await axios.post(`/api/people/deletecarsforid?id=${this.state.personId}`);
        this.props.history.push('/');
    }

    render() {

        return (<div style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="col-md-10">
                    <input type="text" onChange={this.onSearchBoxChange} className="form-control form-control-lg" placeholder="Search Cars" value={this.state.searchBox} />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-dark btn-lg w-100" onClick={this.onClearClick }>Clear</button>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.searchedCars.map(c =>

                                <tr key={c.id}>
                                    <td>{c.make}</td>
                                    <td>{c.model}</td>
                                    <td>{c.year}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3>Are you sure you want to delete all of these cars?</h3>
                </div>
                <div className="col-md-6" style={{ marginTop: 20 }}>
                    <Link to="/" >
                        <button className="btn btn-primary btn-lg w-100">No</button>
                    </Link>
                </div>
                <div className="col-md-6" style={{ marginTop: 20 }}>
                    <button className="btn btn-danger btn-lg w-100" onClick={this.onDeleteClick }>Yes</button>
                </div>
            </div>
        </div>
        )
    }
}

export default DeleteCars;
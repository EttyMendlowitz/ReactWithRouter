import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow'
import { Link } from 'react-router-dom';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        shownPeople: [],
        searchBox: ''
    }

    componentDidMount = async () => {
        await this.refreshTable();
    }

    refreshTable = async () => {
        const response = await axios.get('/api/people/getallpeople');
        const people = response.data;
        this.setState({ people, shownPeople: people})
    }

    onSearchBoxChange = e => {
        const searchBox = e.target.value;
        this.setState({ searchBox });
        let searchedPeople;
        if (searchBox) {

            searchedPeople = this.state.people.filter(p => p.firstName.toLowerCase().includes(searchBox.toLowerCase()) || p.lastName.toLowerCase().includes(searchBox.toLowerCase()));
        }
        else {
            searchedPeople = this.state.people;
        }
        this.setState({ shownPeople: searchedPeople })
    }

    onClearClick = () => {
        this.setState({ searchBox: '', shownPeople: this.state.people })
    }

    render() {
        const { shownPeople } = this.state;
        return (<div className='container' style={{ marginTop: '80px' }}>
                <div >
                    <div className='row'>
                    <div className='col-md-10'>
                        <input className='form-control form-control-lg' type='text' placeholder='Search People' onChange={this.onSearchBoxChange} value={this.state.searchBox} />
                        </div>
                    <div className='col-md-2'>
                        <button className='btn btn-dark btn-lg w-100' onClick={this.onClearClick}>Clear</button>
                        </div>
                        <div className='col-md-12' style={{ marginTop: '20px' }}>
                            <Link to='/AddPerson'>
                                <button className='btn btn-success btn-lg w-100'>Add Person</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <table className="table table-hover table-striped table-bordered" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Car Count</th>
                            <th>Add Car</th>
                            <th>Delete Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shownPeople.map(p => <PersonRow key={p.id} person={p} />)}
                    </tbody>
                </table>

            </div>)


    }
}
export default PeopleTable;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function PersonRow(props) {

    const { id, firstName, lastName, age, cars } = props.person;
    return (<tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>{cars.length}</td>
        <td>
            <Link to={`/addcar/${id}`}>
                <button className="btn btn-primary">Add Car</button>
            </Link>
        </td>
        <td>
            <Link to={`/deletecars/${id}`}>
                <button className="btn btn-danger">Delete Cars</button>
            </Link>
        </td>
    </tr>)
}

export default PersonRow;
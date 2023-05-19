import React from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './Layout';
import peopleTable from './PeopleTable';
import addPerson from './AddPerson';
import addCar from './AddCar';
import deleteCars from './DeleteCars';

const App = () => {
    return (
      <Layout>
        <Route exact path='/' component={peopleTable}/>
        <Route exact path='/AddPerson' component={addPerson}/>
        <Route exact path='/addcar/:id' component={addCar}/>
        <Route exact path='/deletecars/:id' component={deleteCars}/>
        </Layout>
    )
}
export default App;
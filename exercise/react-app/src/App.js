import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Component
import LandingComponent from './components/customer';
import MovieDetailComponent from './components/movieDetail';
import MoviePayComponent from './components/moviePay'
import Admin from './components/admin/admin';
import LandingAdmin from './components/admin/landing';
import AddMoviewAdmin from './components/admin/add';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={LandingComponent} />
            <Route path="/detail/:id" exact component={MovieDetailComponent} />
            <Route path="/payment" exact component={MoviePayComponent} />
            <Route path="/about" exact component={LandingComponent} />

            <Route path="/admin" exact component={Admin} />
            <Route path="/admin/movie_landing" exact component={LandingAdmin} />
            <Route path="/admin/movie_add" exact component={AddMoviewAdmin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

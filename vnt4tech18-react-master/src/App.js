import React, { Component } from 'react';
import './App.css';

import Cabecalho from './components/navigation/Header/Header';
import Lista from './components/job/JobList/JobList';
import Main from './components/navigation/Main/Main';
import About from './components/about/About';

import Login from './components/login/Login';

import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  state = {
    loggedUser: JSON.parse(window.localStorage.getItem('user')) || null
  }

  getLoggedUser() {
    return this.state.loggedUser;
  }

  loginHandler = ( email, pass ) => {
    axios.post('/login', { 'email': email, 'password': pass })
      .then(response => {
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        window.localStorage.setItem('token', response.data.token);

        this.setState({ loggedUser: response.data.user });
      })
      .catch(error => {
        console.error(error);
        alert("Login inválido!");
      })
  }

  logoutHandler = () => {
    window.localStorage.clear();
    this.setState({ loggedUser: null });
  }

  render() {

    if (this.getLoggedUser()) {
      return (
        <div className="App">
          <Cabecalho userName={this.state.loggedUser.name} logout={this.logoutHandler}/>
          <Main>
            <Switch>
              <Route exact path='/' component={ Lista }></Route>
              <Route path='/vagas' component={ Lista }></Route>
              <Route path='/sobre' component={ About }></Route>
            </Switch>
          </Main>
            
        </div>
      );
    } 
    
    return (<Login login={this.loginHandler}/>);   
  }
}

export default App;

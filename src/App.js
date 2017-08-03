import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Home  from './views/home';
import Cards from './views/cards';
import Registration from './views/registration';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      signedIn: false,
      user: {}
    }
  }
  signIn(response){
    console.log(response);
    this.setState({ signedIn: true, user: response });
    window.location.pathname = "/wanted/cards";
  }
  render(){
    if(this.state.signedIn){
      return(
        <div>
          <BrowserRouter>
            <div id="router">
              <Switch>
                <Route path="/wanted/cards" render={(props)=>{
                  return <Cards currentUser={this.state.user} history={props.history} match={props.match} />;
                }} />
                <Route path="/wanted/users" render={(props)=>{
                  return <Registration currentUser={this.state.user} history={props.history} match={props.match} />;
                }} />
                <Route component={Home} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      );
    } else {
      return <Home signIn={this.signIn.bind(this)} />;
    }
  }
}

export default App;
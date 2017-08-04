import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

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
    if(response.id){
      this.setState({ signedIn: true, user: response });
    }
  }
  render(){
    if(this.state.signedIn){
      return(
        <div>
          <div id="router">
            <Switch>
              <Route path="/wanted/users" render={(props)=>{
                return <Registration currentUser={this.state.user} history={props.history} match={props.match} />;
              }} />
              <Route render={(props)=>{
                return <Cards currentUser={this.state.user} history={props.history} match={props.match} />;
              }} />
            </Switch>
          </div>
        </div>
      );
    } else {
      return <Home signIn={this.signIn.bind(this)} />;
    }
  }
}

export default App;
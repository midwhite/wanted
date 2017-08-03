import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Home extends React.Component {
  render(){
    return(
      <div id="home" style={{position: "relative", height: window.innerHeight}}>
        <h1 style={{textAlign: "center", fontWeight: "bold"}}>Wanted</h1>

        <div className="facebookLoginButton" style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto"
        }}>
          <FacebookLogin
            appId="121398381830440"
            autoLoad={false}
            callback={this.props.signIn}
            icon="fa-facebook"
          />
        </div>
      </div>
    );
  }
}
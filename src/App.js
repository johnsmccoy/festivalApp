import React, { Component } from 'react';
import './App.css';
import Login from './login'
import Register from './register'
import NavBar from './NavBar'

class App extends Component {
  state = {
    currentView: "login",
    activeUser: sessionStorage.getItem("userId"),
    newPassword: ""
  };

  // Search handler -> passed to NavBar
  
    // Set initial state
    state = {
        currentView: "login",
        activeUser: sessionStorage.getItem("userId"),
        viewingUser: ""
    }
  setActiveUser = function(val){
    if (val) {
      localStorage.setItem("userId", val);
      this.setState({
        activeUser: val
      })
    } else {
      localStorage.removeItem("userId");
      this.setState({
        activeUser: null
      })
    }
  }.bind(this)
  View = () => {
    if (this.state.currentView === "register") {
      return (
        <Register showView={this.showView} setActiveUser={this.setActiveUser} setUsernamePassword={this.setUsernamePassword}/>
      );
    } else if (sessionStorage.getItem("userId") === null) {
      return (
        <Login showView={this.showView} setActiveUser={this.setActiveUser} newEmail={this.state.newEmail} newPassword={this.state.newPassword}/>
      );
    } else {
      switch (this.state.currentView) {
        case "logout":
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Login setActiveUser={this.setActiveUser} />
      </div>
    );
  }
}

export default App;

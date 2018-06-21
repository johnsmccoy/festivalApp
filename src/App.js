import React, { Component } from 'react';
import './App.css';
import Login from './login';
import Register from './register';
import Home from './home';
import NavBar from './NavBar';

class App extends Component {
  state = {
    currentView: "login",
    activeUser: sessionStorage.getItem("userId"),
    newPassword: ""
  };
  setActiveUser = function (val) {
    if (val) {
      sessionStorage.setItem("userId", val);
      this.setState({
        activeUser: val
      })
    } else {
      sessionStorage.removeItem("userId");
      this.setState({
        activeUser: null
      })
    }
  }.bind(this)

  setViewingUser = function (val) {
    this.setState({
        viewingUser: val
    })
}.bind(this)

  
  
  showView = function (e) {
    let view = null;

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
      view = e.target.id.split("__")[1];

      // View switch manually triggered by passing in string
    } else {
      view = e;
    }

    // If user clicked logout in nav, empty local storage and update activeUser state
    if (view === "logout") {
      this.setActiveUser(null);
    }

    // Update state to correct view will be rendered
    this.setState({
      currentView: view
    })
  }.bind(this)



  View = () => {
    if (this.state.currentView === "register") {
      return (
        <Register showView={this.showView} setActiveUser={this.setActiveUser} setUsernamePassword={this.setUsernamePassword} />
      );
    } else if (sessionStorage.getItem("userId") === null) {
      return (
        <Login showView={this.showView} setActiveUser={this.setActiveUser} newPassword={this.state.newPassword} />
    );}
     else {
      switch (this.state.currentView) {
        // case "logout":
        case "Home":  
        return (
        <Home id ={sessionStorage.getItem("userId")} />)
          
      }
    }
  }

  render() {
    return (
      <article className="App">
      <NavBar
          viewHandler={this.showView}
          searchHandler={this.performSearch}
          activeUser={this.state.activeUser}
          setActiveUser={this.setActiveUser}
        />
      {this.View()}
      </article>
    );
  }
}

export default App;

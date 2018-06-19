import React, { Component } from 'react';
import './App.css';
import Login from './login'
import Register from './register'

class App extends Component {
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


  render() {
    return (
      <div className="App">
        <Login setActiveUser={this.setActiveUser} />
      </div>
    );
  }
}

export default App;

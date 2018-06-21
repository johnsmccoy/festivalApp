import React, { Component } from "react";
import App from './App';

export default class Login extends Component {
  constructor(props) {
    super(props)
    if (this.props.newUserName === null) {
      this.state = {
        username: "",
        password: ""
      }
    } else {
      this.state = {
        username: this.props.newUserName,
        password: this.props.newPassword
      }
    }
  }

      

  // Update state whenever an input field is edited
  handleFieldChange = function(evt) {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }.bind(this);

  // Handle for login submit
  handleLogin = (e) => {
    e.preventDefault();


    // Determine if a user already exists in API
    fetch(
      `http://localhost:8088/users?username=${this.state.username}&password=${this.state.password}`
    )
      .then(r => r.json())
      .then(function (user) {
        // User exists. Set local storage, and show home view
        if (user.length) {
          this.props.setActiveUser(user[0].id);
          this.props.showView("home");

          // User doesn't exist
        } else {
          alert("User Name and Password Do Not Match Our Records.");
        }
      }.bind(this));
  }

  registerButtonClick = () => {
    this.props.showView("register");
  };

  render() {
    return (
      <div className="formDiv">
        <form className="form-signin" onSubmit={this.handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Festival Application</h1>
          <label htmlFor="inputEmail" className="sr-only">
            User Name
          </label>
          <input
            onChange={this.handleFieldChange}
            defaultValue={this.props.newUserName}
            placeholder="User Name"
            type="username "
            id="username"
            className="form-control"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            className="form-control"
            defaultValue={this.props.newPassword}
            placeholder="Password"
            required=""
          />
          <div className="checkbox mb-3">
            <input type="checkbox" value="remember-me" /> Remember me
          </div>
          <button type="submit">
            Sign In
          </button>

          <button
            id="login__register"
            className="btn btn-lg btn-info btn-block"
            onClick={this.registerButtonClick}
          >
            Register
          </button>
          
        </form>
      </div>
    );
  }
}

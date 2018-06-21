import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.usernameChange = this.firstnameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  usernameChange(event) {
    this.setState({ username: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    // Prevent form from clearing every time submitted
    event.preventDefault();

    // Store submitted values into variables
    const submittedUsername = this.state.username;
    const submittedPassword = this.state.password;

    fetch(`http://localhost:8088/users?email=${submittedUsername}`)
      // Must be explicit on how to parse the response
      .then(r => r.json())

      // JSON parsed data comes to this then()
      .then(user => {
        // Convert user to string to get undefined if empty (instead of empty array)
        if (user.toString()) {
          document
            .getElementById("userExistsAlert")
            .removeAttribute("class", "userexists");

          // if doesn't exist, add to user db and forward to login page, passing username/password
        } else {
          fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
            user: submittedUsername,
            password: submittedPassword,
            })
          });
          this.props.setUsernamePassword(submittedUsername, submittedPassword)
          this.setState({
            username: '',
            password: '',
          });
          this.props.showView("login")
        }
      });
  }

  render() {
    return (
      <div className="formDiv">
        {/* <h1>Sign-up to use our app below!</h1> */}
        <form onSubmit={this.handleSubmit} className="form-login">
        <h1 className="h3 mb-3 font-weight-normal">Register to use Festival App:</h1>
            
            <input className="form-control"
            placeholder="First Name"
              type="text"
              value={this.state.username}
              onChange={this.usernameChange}
            />
            <input className="form-control"
            placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.passwordChange}
            />
          <input type="submit" value="Submit" className="btn btn-lg btn-info btn-block"/>
          <div id="userExistsAlert" className="userexists">
          <p>That user name already exists. Click here to log in.</p>
        </div>
        </form>
      </div>
    );
  }
}

export default Register;
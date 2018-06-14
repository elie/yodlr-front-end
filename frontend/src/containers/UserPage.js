import React, { Component } from "react";
import axios from "axios";

export default class UserPage extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    hasRegistered: false
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    let { firstName, lastName, email } = this.state;
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", {
        firstName,
        lastName,
        email
      })
      .then(() => {
        this.setState({
          hasRegistered: true
        });
      })
      .catch(() => {
        alert("something went wrong!");
      });
  };
  render() {
    if (!this.state.hasRegistered) {
      return (
        <div>
          <h1>Welcome!</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <button>Register!</button>
          </form>
        </div>
      );
    } else {
      return <h2>Thank you for signing up!</h2>;
    }
  }
}

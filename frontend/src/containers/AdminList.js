import React, { Component } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";

export default class AdminList extends Component {
  state = {
    users: [],
    filteredUsers: [],
    loadingMessage: "Loading...",
    errorMessage: "",
    emailSearchValue: ""
  };
  componentDidMount() {
    axios
      .get("http://localhost:3000/users")
      .then(data => {
        this.setState({
          filteredUsers: data.data,
          users: data.data,
          loadingMessage: ""
        });
      })
      .catch(err => {
        this.setState({
          loadingMessage: "",
          errorMessage: "Something went wrong, please try again!"
        });
      });
  }
  handleToggleActivation = (firstName, lastName, email, id, state) => {
    axios
      .put(`http://localhost:3000/users/${id}`, {
        email,
        firstName,
        lastName,
        id,
        state: state === "pending" ? "active" : "pending"
      })
      .then(response => {
        let usersWithUpdate = this.state.users.map(function(user) {
          if (user.id === response.data.id) {
            return response.data;
          }
          return user;
        });
        this.setState({
          users: usersWithUpdate
        });
      })
      .catch(() => {
        console.log("Something went wrong, please try again!!");
      });
  };
  handleChange = e => {
    let filteredUsers = this.state.users.filter(user =>
      user.email.includes(e.target.value)
    );
    this.setState({
      filteredUsers,
      [e.target.name]: e.target.value
    });
  };
  render() {
    let users = this.state.filteredUsers.map(
      ({ firstName, lastName, email, id, state }) => (
        <UserCard
          firstName={firstName}
          lastName={lastName}
          email={email}
          key={id}
          state={state}
          toggleActivation={() =>
            this.handleToggleActivation(firstName, lastName, email, id, state)
          }
        />
      )
    );
    return (
      <div>
        <h1>Hello from AdminList!</h1>
        <p>Search for a user by email:</p>
        <input
          type="text"
          name="emailSearchValue"
          value={this.state.emailSearchValue}
          onChange={this.handleChange}
        />
        <p>{this.state.loadingMessage}</p>
        <p>{this.state.errorMessage}</p>
        {/* <pre>{JSON.stringify(this.state.users, null, 2)}</pre> */}
        {users}
      </div>
    );
  }
}

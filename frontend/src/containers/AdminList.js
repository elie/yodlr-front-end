import React, { Component } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";

export default class AdminList extends Component {
  state = {
    users: [],
    loadingMessage: "Loading...",
    errorMessage: ""
  };
  componentDidMount() {
    axios
      .get("http://localhost:3000/users")
      .then(data => {
        this.setState({
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
  render() {
    let users = this.state.users.map(
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
        <p>{this.state.loadingMessage}</p>
        <p>{this.state.errorMessage}</p>
        {/* <pre>{JSON.stringify(this.state.users, null, 2)}</pre> */}
        {users}
      </div>
    );
  }
}

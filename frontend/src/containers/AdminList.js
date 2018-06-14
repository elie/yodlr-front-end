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
  render() {
    let users = this.state.users.map(
      ({ firstName, lastName, email, id, state }) => (
        <UserCard
          firstName={firstName}
          lastName={lastName}
          email={email}
          key={id}
          state={state}
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

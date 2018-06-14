import React, { PureComponent } from "react";

export default class UserCard extends PureComponent {
  render() {
    const { firstName, lastName, email, state } = this.props;
    return (
      <div>
        {firstName} {lastName}
        <div>Email: {email}</div>
        <div>State: {state}</div>
      </div>
    );
  }
}

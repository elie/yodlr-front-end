import React, { PureComponent } from "react";

export default class UserCard extends PureComponent {
  render() {
    const { firstName, lastName, email, state, toggleActivation } = this.props;
    return (
      <div>
        {firstName} {lastName}
        <div>Email: {email}</div>
        <div>State: {state}</div>
        {state === "pending" ? (
          <button onClick={toggleActivation}>Activate</button>
        ) : (
          <button onClick={toggleActivation}>Deactivate</button>
        )}
      </div>
    );
  }
}

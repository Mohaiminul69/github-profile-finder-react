import React, { Component } from "react";
import UserItem from "../user/UserItem";
import Spinner from "../spinner/Spinner";

class User extends Component {
  render() {
    const { users, loading } = this.props;
    const userArr = Array.from(users);
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div style={userStyle}>
          {userArr.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      );
    }
  }
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default User;

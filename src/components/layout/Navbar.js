import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Navbar extends Component {
  static defaultProps = {
    title: "Default Naam",
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  render() {
    const { title } = this.props;
    return (
      <nav className="navbar bg-primary">
        <h1>{title}</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

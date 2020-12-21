import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    name: "",
  };

  onChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "") {
      this.props.setAlert("Enter a name", "light");
    } else {
      this.props.searchUser(this.state.name);
    }
  };

  static propType = {
    searchUser: PropTypes.func.isRequired,
    clearUser: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Search Users..."
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUser}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;

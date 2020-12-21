import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import User from "./components/user/User";
import Search from "./components/user/Search";
import Alert from "./components/layout/Alert";
import About from "./components/layout/About";
import UserInfo from "./components/user/UserInfo";

class App extends Component {
  state = {
    users: {},
    user: {},
    repos: null,
    loading: false,
    alert: null,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await fetch(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();
    this.setState({
      users: data,
      loading: false,
    });
  }

  searchUser = async (name) => {
    this.setState({ loading: true });
    const res = await fetch(
      `https://api.github.com/search/users?q=${name}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();
    const gitNames = data.items;
    this.setState({ users: gitNames, loading: false });
  };

  getUser = async (login) => {
    this.setState({ loading: true });
    const res = await fetch(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const user = await res.json();
    this.setState({ loading: false, user: user });
  };

  getRepos = async (login) => {
    this.setState({ loading: true });
    const res = await fetch(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const repos = await res.json();
    this.setState({ repos: repos, loading: false });
  };

  clearUser = () => {
    this.setState({ users: {} });
  };

  setAlert = (msg, className) => {
    this.setState({ alert: { msg: msg, className: className } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar title={"Github Finder"} />
          <Alert alert={this.state.alert} />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUser={this.clearUser}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <User
                      users={this.state.users}
                      loading={this.state.loading}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/users/:login"
                render={(props) => (
                  <UserInfo
                    {...props}
                    getUser={this.getUser}
                    getRepos={this.getRepos}
                    user={this.state.user}
                    loading={this.state.loading}
                    repos={this.state.repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

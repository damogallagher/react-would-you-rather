import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Logout from "./Logout";
import Login from "./Login";
import { isLoggedIn } from "../utils/helpers";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loggedIn !== true ? (
              <div>
                <Route path="/logout" component={Logout} />
                <Login />
              </div>
              
              
            ) : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/logout" component={Logout} />
              </div>
            )}
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: isLoggedIn(authedUser),
  };
}

export default connect(mapStateToProps)(App);

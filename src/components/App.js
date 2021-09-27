import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import QuestionList from "./question/QuestionList";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./question/NewQuestion";
import QuestionPoll from "./question/QuestionPoll";
import Nav from "./nav/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Leaderboard from "./leaderboard/Leaderboard";
import Logout from "./auth/Logout";
import Login from "./auth/Login";
import { isLoggedIn } from "../utils/helpers";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Error404 from "./error/Error404";

class App extends Component {
  //Use component did mount to load the initial data
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <LoadingBar />
            <Nav />
            <br />
            <br />
            {this.props.loggedIn !== true ? (
              <div>
                <Route path="/logout" component={Logout} />
                <Login />
              </div>
            ) : (
              <div>
                <Route path="/" exact component={QuestionList} />
                <Route path="/question/:id" component={QuestionPoll} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/logout" component={Logout} />
                <Route path="/404" component={Error404} />
              </div>
            )}
          </Container>
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

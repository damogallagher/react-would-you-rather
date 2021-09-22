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
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
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
            <br /><br />
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

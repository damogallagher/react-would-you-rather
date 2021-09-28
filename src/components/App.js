import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleInitialData } from "../actions/shared";
import QuestionList from "./question/QuestionList";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./question/NewQuestion";
import QuestionPoll from "./question/QuestionPoll";
import { Nav } from "./nav/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import { Leaderboard } from "./leaderboard/Leaderboard";
import { Logout } from "./auth/Logout";
import { Login } from "./auth/Login";
import { isLoggedIn } from "../utils/helpers";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Error404 } from "./error/Error404";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  const authedUser = useSelector((state) => state.authedUser);
  const loggedIn = isLoggedIn(authedUser);
  return (
    <BrowserRouter>
      <Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <LoadingBar />
          <Nav />
          <br />
          <br />
          {loggedIn !== true ? (
            <div>
              <Route path="/logout" component={Logout} />
              <Login />
            </div>
          ) : (
            <div>
              <Route path="/" exact component={QuestionList} />
              <Route path="/question/:id" component={QuestionPoll} />
              <Route path="/add" component={NewQuestion} />
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

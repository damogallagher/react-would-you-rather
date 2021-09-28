import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { QuestionList } from "./question/QuestionList";
import LoadingBar from "react-redux-loading";
import { NewQuestion } from "./question/NewQuestion";
import { QuestionPoll } from "./question/QuestionPoll";
import { Nav } from "./nav/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import { Leaderboard } from "./leaderboard/Leaderboard";
import { Logout } from "./auth/Logout";
import { Login } from "./auth/Login";
import { isLoggedIn } from "../utils/helpers";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Error404 } from "./error/Error404";
import { Redirect } from "react-router-dom";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <LoadingBar />
          <Nav />
          <br />
          <br />
          <div>
            <PrivateRoute path="/" exact>
              <QuestionList />
            </PrivateRoute>
            <PrivateRoute path="/question/:id">
              <QuestionPoll />
            </PrivateRoute>
            <PrivateRoute path="/add">
              <NewQuestion />
            </PrivateRoute>
            <PrivateRoute path="/leaderboard">
              <Leaderboard />
            </PrivateRoute>
            <Route path="/404" component={Error404} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
          </div>
        </Container>
      </Fragment>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  const authedUser = useSelector((state) => state.authedUser);
  const loggedIn = isLoggedIn(authedUser);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return loggedIn === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

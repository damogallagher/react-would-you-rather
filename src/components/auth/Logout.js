import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authedUser";
import { Redirect } from "react-router-dom";

export function Logout(props) {
  const dispatch = useDispatch();
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  useEffect(() => {
    dispatch(logoutUser());
    setRedirectToDashboard(true);
  }, [dispatch]);

  if (redirectToDashboard === true) {
    return <Redirect to="/" />;
  }

  return <div>Logout</div>;
}

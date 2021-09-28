import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authedUser";

export function Logout(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    props.history.push("/");
  }, [dispatch, props.history]);

  return <div>Logout</div>;
}



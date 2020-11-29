import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withCookies, Cookies } from "react-cookie";

const PrivateRoute = ({ component: Component, cookies, ...rest }) => {
  const user = cookies.get("user");
  debugger;

  // const isLogin = useSelector((state) => state.isLogin) ;
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default withCookies(PrivateRoute);

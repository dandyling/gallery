import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangeTracker = () => {
  const history = useHistory();

  history.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <div></div>;
};

export default withRouter(RouteChangeTracker);

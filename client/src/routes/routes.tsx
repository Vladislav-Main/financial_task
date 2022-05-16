import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../pages/Home";

export const useRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};

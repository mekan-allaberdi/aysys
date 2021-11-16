import React from "react";

import { AuthProvider } from "./context/userContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./services/PrivateRoute";
import SignIn from "./components/account/Signin";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <CssBaseline />{" "}
      <Router>
        <AuthProvider>
          <Switch>
            <Route component={SignIn} path="/login" />
            <PrivateRoute component={Main} path="/" />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

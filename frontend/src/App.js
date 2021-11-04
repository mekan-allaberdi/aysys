import "./App.css";

import { AuthProvider } from "./context/userContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./services/PrivateRoute";
import SignIn from "./components/account/Signin";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      {" "}
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

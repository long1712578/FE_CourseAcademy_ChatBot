import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" exact>
                  <HomePage/>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;

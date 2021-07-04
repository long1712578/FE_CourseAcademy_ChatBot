import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage";
import ProductList from "./pages/ProductList";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" exact>
                  <HomePage/>
              </Route>
              <Route path="/product-list" exact>
                  <ProductList/>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;

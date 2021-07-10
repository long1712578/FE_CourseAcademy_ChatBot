import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage";
import ProductList from "./pages/ProductList";
import Product from "./pages/SingleProduct";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" exact>
                  <HomePage/>
              </Route>
              <Route path="/courses" exact>
                  <ProductList/>
              </Route>
              <Route path="/courses/:id">
                  <Product/>
              </Route>

          </Switch>
      </Router>

  );
}

export default App;

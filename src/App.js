import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage";
import CartProduct from "./pages/CartProduct";
import ProductList from "./pages/ProductList";
import Product from "./pages/SingleProduct";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core/styles";
import Login from './pages/authentication/login';
import Signup from './pages/authentication/signup';
import Profile from './pages/profile';

import theme from "assets/theme/theme.js";
import AddCourse from "./pages/AddCourse";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
              <Route path="/home" exact>
                  <HomePage></HomePage>
              </Route>
              <Route path="/courses" exact>
                  <ProductList/>
              </Route>
              <Route path="/cart">
                  <CartProduct/>
              </Route>
              <Route path="/courses/:id">
                  <Product/>
              </Route>
              <Route path="/profile">
                  <Profile/>
              </Route>
              <Route path="/login">
                  <Login/>
              </Route>
              <Route path="/signup">
                  <Signup/>
              </Route>
              <Route path="/add-course">
                  <AddCourse/>
              </Route>
              <Redirect from="/" to="/home" />

          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

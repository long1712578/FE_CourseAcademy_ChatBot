import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage";
import ProductList from "./pages/ProductList";
import Product from "./pages/SingleProduct";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core/styles";
import Login from './pages/authentication/login';
import Signup from './pages/authentication/signup';
import Profile from './pages/profile';
import PreviewProduct from './pages/previewProduct';

import theme from "assets/theme/theme.js";
import AddCourse from "./pages/AddCourse";
import Contact from "pages/contact";
import Introduce from "pages/introduce";

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
              <Route path="/introduce" exact>
                  <Introduce/>
              </Route>
              <Route path="/contact" exact>
                  <Contact/>
              </Route>
              <Route path="/courses/:id" exact>
                  <Product/>
              </Route>
              <Route path="/courses/:id/preview" exact>
                  <PreviewProduct />
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

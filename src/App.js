import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage";
import CartProduct from "./pages/CartProduct";
import ProductList from "./pages/ProductList";
import Product from "./pages/SingleProduct";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

function App() {
  return (
    <Product></Product>
    // <ThemeProvider theme={theme}>
    //   <Router>
    //       <Switch>
    //           <Route path="/" exact>
    //               <HomePage/>
    //           </Route>
    //           <Route path="/courses" exact>
    //               <ProductList/>
    //           </Route>
    //           <Route path="/courses/:id">
    //               <Product/>
    //           </Route>

    //       </Switch>
    //   </Router>
    // </ThemeProvider>
  );
}

export default App;

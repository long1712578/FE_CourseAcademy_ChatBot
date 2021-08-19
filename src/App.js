import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./App.css";
import HomePage from "./pages/homepage";
import ProductList from "./pages/ProductList";
import Product from "./pages/SingleProduct";
// import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Profile from "./pages/profile";

import theme from "assets/theme/theme.js";
import AddCourse from "./pages/AddCourse";
import Contact from "pages/contact";
import Introduce from "pages/introduce";

import ListCourseTaught from "./pages/ListCourseTaught";
import UpdateCourse from "./pages/UpdateCourse";
import { authenProvider } from "./providers/authenProvider";
import CallAPI from "./until/callAPI";
function App() {
  const [authen, setAuthen] = useState({isLogin: false, user: {}, token: null});
  useEffect(() => {
    const fetchData = async () => {
        const userToken = JSON.parse(localStorage.getItem("user"));
        const accessToken = userToken ? userToken.accessToken : null;
        const decode = accessToken ? jwt_decode(accessToken) : null;
        const userId = decode ? decode.userId: null;
        if(userId){
            const res = await CallAPI("GET",null, `/users/${userId}`);
            if(res.status === 1){
                setAuthen({isLogin: true ,user: res.data});
            }
        }else{
            setAuthen({isLogin: false, user: {}})
        }
    };
    fetchData();
  },[]);
  return (
    <ThemeProvider theme={theme}>
      <authenProvider.Provider value={{authen, setAuthen}}>
        <Router>
          <Switch>
            <Route path="/home" exact>
              <HomePage></HomePage>
            </Route>
            <Route path="/courses" exact>
              <ProductList />
            </Route>
            <Route path="/introduce" exact>
              <Introduce />
            </Route>
            <Route path="/contact" exact>
              <Contact />
            </Route>
            <Route path="/courses/:id" exact>
              <Product />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/add-course">
              <AddCourse />
            </Route>
            <Route path="/list-course-taught">
              <ListCourseTaught />
            </Route>
            <Route path="/update-course/:id">
              <UpdateCourse />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </Router>
      </authenProvider.Provider>
    </ThemeProvider>
  );
}

export default App;

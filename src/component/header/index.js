import React, {useState} from "react";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { 
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  FileAddOutlined,
  UnorderedListOutlined

   } 
from '@ant-design/icons';
import "./header.css";
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";


export default function Header(props) {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const accessToken = userToken ? userToken.accessToken : null;
  const role = userToken ? userToken.role : null;
  const decode = accessToken ? jwt_decode(accessToken) : null;
  const [loginState, setLoginState] = useState(decode ? {isLogin: true, user: decode} : {isLogin: false, user: null});
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoginState({isLogin: false, user: null});
  }
  return (
    <div className="header-course">
      <div className="header-top">
          <Navbar className="color-nav" bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">
              <img className="logo-course" src="/images/your-logo.png"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav-header-right">
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Nhập tên tìm kiếm..."
                    className="mr-sm-2 input-search"
                  />
                  <Button variant="outline-success"><SearchOutlined /> &nbsp;Tìm kiếm</Button>
                </Form>
                
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        
      <div className="home-header">
          <div className="home-logo"><i className="fas fa-home"></i></div>
          <div className="left-header">
              <Nav.Link className="link-home-header" href="/home">&nbsp;HOME</Nav.Link>
              <Nav.Link className="link-home-header" href="/courses">&nbsp;COURSES</Nav.Link>
              <Nav.Link className="link-home-header" href="/introduce">&nbsp;INTRODUCE</Nav.Link>
              <Nav.Link className="link-home-header" href="/contact">&nbsp;CONTACT</Nav.Link>
              <NavDropdown className="link-home-header" title={loginState.user ? loginState.user.fullName : "No user"} id="basic-nav-dropdown">
                {
                  loginState.isLogin ?
                  <div>
                    <NavDropdown.Item href="/profile">
                    <InfoCircleOutlined /> &nbsp; Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                    <LogoutOutlined /> &nbsp; Logout
                    </NavDropdown.Item>
                    {(role ===2 ) &&
                      <NavDropdown.Item href="/add-course">
                      <FileAddOutlined /> &nbsp; Add course
                      </NavDropdown.Item>
                    }
                    {(role ===2 ) &&
                      <NavDropdown.Item href="/list-course-taught">
                      <UnorderedListOutlined /> &nbsp; Courses taught
                      </NavDropdown.Item>
                    }
                  </div>
                  : 
                  <div>
                    <NavDropdown.Item href="/login">
                    <LoginOutlined /> &nbsp;Signin
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/signup">
                    <UserAddOutlined /> &nbsp;Signup
                    </NavDropdown.Item>
                  </div>
                }
              </NavDropdown>
          </div>
            
        </div>
    </div>
  );
}

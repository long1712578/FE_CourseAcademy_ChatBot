import React, {useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { useHistory } from "react-router-dom";
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
import {authenProvider} from "../../providers/authenProvider";


export default function Header(props) {
  const router = useHistory();
  const {authen, setAuthen} = useContext(authenProvider);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthen({isLogin: false, user: null, token: null});
    router.push('/login');
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
              <NavDropdown className="link-home-header" title={authen.isLogin ? authen.user.fullname : "No user"} id="basic-nav-dropdown">
                {
                  authen.isLogin ?
                  <div>
                    <NavDropdown.Item href="/profile">
                    <InfoCircleOutlined /> &nbsp; Profile
                    </NavDropdown.Item>

                      {/* <NavDropdown.Item href="/add-course">
                          <i className="far fa-plus-square"></i> &nbsp; Add Course
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/list-course-taught">
                          <i className="far fa-list-alt"></i> &nbsp; List of courses being taught
                      </NavDropdown.Item> */}
                    <NavDropdown.Item onClick={handleLogout}>
                    <LogoutOutlined /> &nbsp; Logout
                    </NavDropdown.Item>
                    {(authen.user.role_id ===2 ) &&
                      <NavDropdown.Item href="/add-course">
                      <FileAddOutlined /> &nbsp; Add course
                      </NavDropdown.Item>
                    }
                    {(authen.user.role_id ===2 ) &&
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

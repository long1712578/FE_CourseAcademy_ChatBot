import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { 
  ShoppingCartOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  SearchOutlined
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
  return (
    <div className="header-course">
      <div className="header-top">
          <Navbar className="color-nav" bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">
              <img className="logo-course" src="./images/your-logo.png" ></img>
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
                <div className="header-button">
                  <Button className="btn-login">Đăng nhập</Button>
                  <Button >Đăng ký</Button>
                </div>
                
                <Nav.Link href="/cart" className="">
                  <div className="cart-icon"><i className="fa fa-shopping-cart"></i></div>
                  <div className="cart-number">0</div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        
      <div className="home-header">
          <div className="home-logo"><i class="fas fa-home"></i></div>
          <div className="left-header">
              <Nav.Link className="link-home-header" href="/home">&nbsp;Trang chủ</Nav.Link>
              <Nav.Link className="link-home-header" href="/course">&nbsp;Khoá học</Nav.Link>
              <Nav.Link className="link-home-header" href="/information">&nbsp;Thông tin</Nav.Link>
              <Nav.Link className="link-home-header" href="/contact">&nbsp;Liên lạc</Nav.Link>
              <NavDropdown className="link-home-header" title="Tài khoản" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/login">
                  <LoginOutlined /> &nbsp;Đăng nhập
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/signup">
                  <UserAddOutlined /> &nbsp;Đăng kí
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/profile">
                  <InfoCircleOutlined /> &nbsp; Thông tin cá nhân
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/logout">
                  <LogoutOutlined /> &nbsp; Đăng xuất
                  </NavDropdown.Item>
              </NavDropdown>
          </div>
            
        </div>
    </div>
  );
}

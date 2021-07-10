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
    <div className="header">
      <div className="row">
        <div className="col-md-12">
          <Navbar
            className="color-nav"
            bg="dark"
            variant="dark"
            expand="lg"
            sticky="top"
          >
            <Navbar.Brand href="#home">
              <img className="logo-course" src="./images/logo-course.jpg"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">&nbsp;Trang chủ</Nav.Link>
                <Nav.Link href="/course">&nbsp;Khoá học</Nav.Link>
                <Nav.Link href="/information">&nbsp;Thông tin</Nav.Link>
                <Nav.Link href="/contact">&nbsp;Liên lạc</Nav.Link>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Nhập tên tìm kiếm..."
                    className="mr-sm-2 input-search"
                  />
                  <Button variant="outline-success"><SearchOutlined /> &nbsp;Tìm kiếm</Button>
                </Form>
                <NavDropdown className="mr-sm-2 account" title="Tài khoản" id="basic-nav-dropdown">
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
                <Nav.Link href="/cart" className="cart">
                <ShoppingCartOutlined />&nbsp;Giỏ Hàng
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

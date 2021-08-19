import React, { useState, useContext } from "react";
import "antd/dist/antd.css";
import "./login.css";
import { useHistory } from "react-router-dom";
import CallUnAuthorize from "../../../until/callUnAuthorize";
import CallAPI from "../../../until/callAPI";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { authenProvider } from "../../../providers/authenProvider";
import jwt_decode from "jwt-decode";
function Login() {
  const { setAuthen } = useContext(authenProvider);
  const [checkSignin, setCheckSignin] = useState(false);
  const router = useHistory();
  const onFinish = (data) => {
    const fetchData = async () => {
      const res = await CallUnAuthorize("POST", { ...data }, "/sign-in");
      if (res.status === 1) {
        const decode = res.data.accessToken ? jwt_decode(res.data.accessToken) : null;
        const userId = decode ? decode.userId : null;
        setCheckSignin(true);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (userId) {
          const res1 = await CallAPI("GET", null, `/users/${userId}`);
          if (res1.status === 1) {
            setAuthen({ isLogin: true, user: res1.data });
            router.push("/home");
          }
        }
      } else {
        setCheckSignin(false);
        setAuthen({ isLogin: false, user: {} });
        toast.error("login fail!");
      }
    };
    fetchData();
  };
  return (
    <div className="login">
      <div className="login-background">
        <div className="login-container">
          <div className="login-title">
            <h2> Login</h2>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter nhập Username!",
                },
              ]}
            >
              <Input
                className="UserName"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              className="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "please enter Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                forget password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              or <a href="/signup">Register</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

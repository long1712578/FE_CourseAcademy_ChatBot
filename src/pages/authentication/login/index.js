import React, {useState} from "react";
import "antd/dist/antd.css";
import "./login.css";
import { useHistory } from 'react-router-dom';
import CallUnAuthorize from "../../../until/callUnAuthorize";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {toast} from "react-toastify";
function Login() {
  const [checkSignin, setCheckSignin] = useState(false);
  const router = useHistory();
  const onFinish = (data) => {
    console.log('Received values of form: ', data);
    const fetchData = async () => {
      const res = await CallUnAuthorize("POST", {...data}, '/sign-in');
      if(res.status === 1) {
          // Chyen sang mang hinh dang nhap
          console.log(res);
          setCheckSignin(true);
          localStorage.setItem('user', JSON.stringify(res.data));
          router.push('/user');
      }
      else{
        setCheckSignin(false);
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
            <h2> Đăng nhập</h2>
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
                  message: "Vui lòng nhập Username!",
                },
              ]}
            >
              <Input className="UserName"
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
                  message: "Vui lòng nhập Password!",
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
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Hiển thị</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Quên password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
              Hoặc <a href="/signup">Đăng kí</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

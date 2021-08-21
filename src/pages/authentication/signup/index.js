import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import CallUnAuthorize from "../../../until/callUnAuthorize";
import { toast } from "react-toastify";
import "antd/dist/antd.css";
import { Form, Input, Select, Checkbox, Button, DatePicker } from "antd";
import "./signup.css";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function Signup() {
  const [form] = Form.useForm();
  const [checkRegister, setCheckRegister] = useState(false);
  const [isSignup, setIsSignup] = useState({ show: false, content: "" });
  const router = useHistory();

  const onFinish = (data) => {
    const fetchData = async () => {
      const user = {
        fullname: data.fullname,
        username: data.username,
        password: data.password,
        address: data.address,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
      };
      // Kieem tra username da ton tai chua
      const checkUsername = await CallUnAuthorize(
        "GET",
        null,
        `/sign-up/check-username?username=${data.username}`
      );
      console.log('check', checkUsername);
      if (checkUsername.status === 1) {
        const res = await CallUnAuthorize("POST", { ...user }, "/sign-up");
        if (res.status === 1) {
          // Chyen sang mang hinh dang nhap
          setIsSignup({ show: true, content: "Please check your email to finish signup!" });
          setCheckRegister(true);
          router.push("/login");
        } else {
          setCheckRegister(false);
          setIsSignup({ show: true, content: "Register fail !" });
        }
      } else {
        setIsSignup({ show: true, content: "Register fail because account exist" });
      }
    };
    fetchData();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+84</Option>
        <Option value="87">+85</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="signup">
      <div className="signup-background">
        <div className="signup-container">
          <div className="signup-title">
            <h2> Register</h2>
          </div>
          <div className="card-signup">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "84",
              }}
              scrollToFirstError
            >
              <Form.Item name="fullname" label="FullName">
                <Input />
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select placeholder="Select your gender">
                  <Option value={0}>Female</Option>
                  <Option value={1}>Male</Option>
                </Select>
              </Form.Item>

              <Form.Item name="date_of_birth" label="Birth day">
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  T had red <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
          <SweetAlert
            show={isSignup.show}
            title="Sign up"
            text={isSignup.content}
            onConfirm={() => setIsSignup({ show: false, content: "" })}
          />
          <div className="goto-login">
            <h3>
              I had account <a href="/login">Signin</a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

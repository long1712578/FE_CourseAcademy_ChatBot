import Header from "../../component/header";
import Footer from "../../component/footer";
import React, { useEffect, useState } from "react";
import { Tabs, Button } from "antd";
import {
  UserDeleteOutlined,
  BookOutlined,
  HeartOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import Information from "./information/index";
import Order from "./order/index";
import CourseFavourite from "./coursesFavourite/index";
import ChangePassword from "./changePassword/index";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Profile = () => {
  const router = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    localStorage.removeItem("user");
    router.push("/login");
  } else {
    const accessToken = user.accessToken;
    if (accessToken) {
      const decode = jwt_decode(accessToken);
    }else{
      localStorage.removeItem("user");
      router.push("/login");
    }
  }
    return (
      <div className="profile-user">
        <Header />
        <div className="profile">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane
              tab={
                <span>
                  <UserDeleteOutlined />
                  INFORMATION
                </span>
              }
              key="1"
            >
              <Information />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <BookOutlined />
                  ORDER
                </span>
              }
              key="2"
            >
              <Order />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <HeartOutlined />
                  FAVOURITE
                </span>
              }
              key="3"
            >
              <CourseFavourite />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <SwapOutlined />
                  CHANGE PASSWORD
                </span>
              }
              key="4"
            >
              <ChangePassword />
            </TabPane>
          </Tabs>
        </div>
        <Footer />
      </div>
    );
};
export default Profile;

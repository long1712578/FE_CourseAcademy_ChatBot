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
  let decode = null;
  let userId = null;
  const router = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    localStorage.removeItem("user");
    router.push("/login");
  } else {
    const accessToken = user.accessToken;
    if (accessToken) {
      decode = jwt_decode(accessToken);
      userId = decode.userId;
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
              <Information userInfo = {decode}/>
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
              <Order id ={userId}/>
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
              <CourseFavourite id ={userId}/>
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
              <ChangePassword id ={userId}/>
            </TabPane>
          </Tabs>
        </div>
        <Footer />
      </div>
    );
};
export default Profile;

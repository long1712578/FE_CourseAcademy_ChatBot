import React from "react";
import {Button } from "antd";
import { useForm } from "react-hook-form";
import CallAPI from "../../../until/callAPI";
import { toast } from "react-toastify";


const Information = ({userInfo}) => {
  // Goi api de load user

  const { register, handleSubmit } = useForm();
  const [disableInput, setDisableInput] = React.useState(true);
  const changeDisableInput = () => {
    setDisableInput(false);
  };
  const onSubmit = (data) => {
    const userUpdate = {
      email: data.email,
      phone: data.phone,
      username: data.username,
      date_of_birth: data.birth_date
    }
    const fetchData = async () => {
      const res = await CallAPI("put", userUpdate, `/users/${userInfo.userId}`);
      console.log("status", res.status);
      if (res.status === 1) {
        setDisableInput(true);
        //Xuat thong bao Cap nhat thanh cong

      } else toast.error("Something went wrong. Try later");
    };
    fetchData();
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="content">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-image">
                <img src="/images/logo-course.jpg" alt=""></img>
              </div>
            </div>
            <div className="col-md-6">
              <fieldset>
                <legend>Student: Pham Dinh Long. </legend>
                <div className="row">
                  <label className="col-sm-3 control-label">Email: </label>
                  <input
                    className="col-sm-9"
                    disabled={disableInput}
                    {...register("email", { value: `${userInfo.email}` })}
                  ></input>
                </div>
                <div className="row">
                  <label className="col-sm-3 control-label">Phone: </label>
                  <input
                    className="col-sm-9"
                    name="phone"
                    disabled={disableInput}
                    {...register("phone", { value: `${userInfo.phone}` })}
                  ></input>
                </div>
                <div className="row">
                  <label className="col-sm-3 control-label">Birth date: </label>
                  <input
                    className="col-sm-9"
                    name="birth-date"
                    disabled={disableInput}
                    {...register("birth_date", { value: `${userInfo.birthDate}` })}
                  ></input>
                </div>
                <div className="row">
                  <label className="col-sm-3 control-label">Username: </label>
                  <input
                    className="col-sm-9"
                    name="username"
                    disabled={disableInput}
                    {...register("username", { value: `${userInfo.userName}` })}
                  ></input>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="profile-button">
            <Button type="primary" onClick={changeDisableInput}>
              Change
            </Button>
            <Button type="primary" htmlType="submit" danger>
              Update
            </Button>
          </div>
        </div>
      </form>
      <div></div>
    </div>
  );
};
export default Information;

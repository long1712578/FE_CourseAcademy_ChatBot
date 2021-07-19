import React, { useEffect, Component, useState } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import CallAPI from "../../../until/callAPI";
import { toast } from "react-toastify";
import './changePassword.css';
import SweetAlert from 'sweetalert2-react';


const ChangePassword = ({id}) => {
  // Goi api de load user
  const [state, setState] = useState({show: false});
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data, e) => {
    const values ={
      newPass: data.password_new,
      oldPass: data.password_now
    };
    const fetchData = async () => {
      const res = await CallAPI("put", values, `/users/${id}/password`);
      if (res.status === 1) {
        e.target.reset();
        setState({ show: true });
      } else toast.error("Something went wrong. Try later");
    };
    fetchData();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <legend>Change password</legend>
                <div className="row">
                  <label className="col-sm-2 control-label">Password now: </label>
                  <input
                    className="col-sm-10" type="password"
                    {...register("password_now", {required: true})}
                    
                  ></input>
                  <span className="error-span">* {errors.password_now && 'Pass fail.'}</span>
                </div>
                <div className="row">
                  <label className="col-sm-2 control-label">Password new: </label>
                  <input
                    className="col-sm-10" type="password"
                    {...register("password_new", {required: true})}
                  ></input>
                   <span className="error-span">* {errors.password_new && 'Pass new not choose.'}</span>
                </div>
                <div className="row">
                  <label className="col-sm-2 control-label">Again password: </label>
                  <input
                    className="col-sm-10" type="password"
                    {...register("again_password", {required: true, validate: value => value ===  watch("password_new")})}></input>
                     <span className="error-span">* {errors.again_password && 'Password new not choose or  not same password new.'}</span>
                </div>
              </fieldset>
              <Button type="primary" htmlType="submit"  danger>
              Update
            </Button>
            </form>
          </div>
        </div>
      </div>
      <SweetAlert
        show={state.show}
        title="Change pass"
        text="Sucess!!!"
        onConfirm={() => setState({ show: false })}
      />
    </div>
  );
};
export default ChangePassword;

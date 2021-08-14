import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import button from "../../../assets/theme/components/button";
import {Modal, Button, Switch} from 'antd';
import CallAPI from "../../../until/callAPI";
import {toast, ToastContainer} from "react-toastify";

const CardTeacher = ({teacher}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fullName, setFullName] = useState(teacher.fullname);
    const [email, setEmail] = useState(teacher.email);
    const [phoneNumber, setPhoneNumber] = useState(teacher.phone);
    const [address, setAddress] = useState(teacher.address);
    const [gender, setGender] = useState(teacher.gender);
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
        } else {
            localStorage.removeItem("user");
            router.push("/login");
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const dataUpdate= new FormData();
        dataUpdate.append('fullname',fullName);
        dataUpdate.append('address',address);
        dataUpdate.append('phone',phoneNumber);
        dataUpdate.append('gender',gender);
        dataUpdate.append('email',email)
        const res = await CallAPI("PUT", dataUpdate, `/users/${userId}`);
        setIsModalVisible(false);
        if (res.status === 1) {
            return toast.success("Updated", {toastId: 10, autoClose: 2000})
        } else return toast.error("Update document failed, try again", {
            toastId: -10,
            autoClose: 2000,
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleName =(e)=>{
        setFullName(e.target.value);
    }

    const handleEmail =(e)=>{
        setEmail(e.target.value);
    }

    const handleAddress =(e)=>{
        setAddress(e.target.value);
    }
    const handleGender =(checked)=>{
        setGender(checked?1:0);
    }

    const handlePhone =(e)=>{
        setPhoneNumber(e.target.value);
    }
    return (
        <article className="card mt-5">
            <div className="card-body">
                <div className="row">
                    <aside className="col-md-6">
                        <h5>Teacher</h5>
                        <dl className="row">
                            <dt className="col-sm-3">Name</dt>
                            <dd className="col-sm-9">{fullName}</dd>

                            <dt className="col-sm-3">Email</dt>
                            <dd className="col-sm-9">{email}</dd>

                            <dt className="col-sm-3">Phone number</dt>
                            <dd className="col-sm-9">{phoneNumber}</dd>

                            <dt className="col-sm-3">Address</dt>
                            <dd className="col-sm-9">{address}</dd>

                            <dt className="col-sm-3">Gender</dt>
                            {
                                gender === 1 &&
                                <dd className="col-sm-9">Man
                                </dd>
                            }
                            {
                                gender === 0 &&
                                <dd className="col-sm-9">Woman
                                </dd>
                            }
                            {
                                userId === teacher.id &&
                                <dd className="col-sm-9">
                                    <button className="btn btn-success" onClick={showModal}>Edit Information Teacher
                                    </button>
                                </dd>
                            }
                        </dl>
                    </aside>
                    <aside className="col-md-6">
                        <h5>Features</h5>
                        <ul className="list-check">
                            <li>Easy to learn</li>
                            <li>Highly-professional trained</li>
                            <li>Create employment conditions after completion</li>
                            <li>Best performance of courses</li>
                            <li>Job support</li>
                        </ul>
                    </aside>
                </div>
                <hr/>
                <p>
                    This is a teacher with extensive experience in the field of programming, invited from prestigious
                    universities. Teachers are always dedicated and try to help and teach their students.
                </p>
            </div>
            <Modal title="Edit teacher information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <dl className="row">
                    <dt className="col-sm-3">Name</dt>
                    <dd className="col-sm-9"><input value={fullName} onChange={handleName}/></dd>

                    <dt className="col-sm-3">Email</dt>
                    <dd className="col-sm-9"><input value={email} onChange={handleEmail}/></dd>

                    <dt className="col-sm-3">Phone number</dt>
                    <dd className="col-md-9"><input value={phoneNumber} onChange={handlePhone}/></dd>

                    <dt className="col-sm-3">Address</dt>
                    <dd className="col-sm-9"><input value={address} onChange={handleAddress}/></dd>

                    <dt className="col-sm-3">Man</dt>
                    <dt className="col-sm-9"><Switch onChange={handleGender}/></dt>

                </dl>
            </Modal>
            <ToastContainer position="bottom-center"/>
        </article>
    )
}
export default CardTeacher;
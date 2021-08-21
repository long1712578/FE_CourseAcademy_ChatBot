import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from "../../component/footer";
import Header from "../../component/header";
import CallAPI from "../../until/callAPI"
import {toast, ToastContainer} from "react-toastify";
import Checkbox from "antd/es/checkbox/Checkbox";
import 'react-toastify/dist/ReactToastify.css';
import {Card, Button} from "antd"
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import CallUnAuthorize from "../../until/callUnAuthorize";
import {Menu} from 'antd';
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
const {SubMenu} = Menu;


const AddCourse = () => {
    const [isLoading, setIsloading] = useState(false);
    const [idCategory, setIdCategory] = useState('-1');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [price, setPrice] = useState(0);
    const [promotionPrice, setPromotionPrice] = useState(0);
    const [srcImage, setSrcImage] = useState();
    const [valueDes, setValueDes] = useState('');
    const [status, setStatus] = useState(false);
    // const [listCategory, setListCategory] = useState([]);
    const [showImg, setShowImg] = useState();
    const [isShowImg, setIsShowImg] = useState("none")
    const [listCategoryWeb, setListCategoryWeb] = useState([]);
    const [listCategoryMobile, setListCategoryMobile] = useState([]);
    const [lstFileDoc, setLstFileDoc] = useState([]);
    const [lstFileVideo, setLstFileVideo] = useState([]);

    const refImg = useRef();

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
    useEffect(() => {
        const fetchData = async () => {
            const resCateWeb = await CallUnAuthorize("GET", null, `/categories/field_id/1`);
            const resCateMobile = await CallUnAuthorize("GET", null, `/categories/field_id/2`);

            if (resCateMobile.status === 1 && resCateWeb.status === 1) {

                setListCategoryWeb(resCateWeb.data)
                setListCategoryMobile(resCateMobile.data);
                //setListCategory(res.data);
            } else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])
    const handleAddDoc = () => {
        document.getElementById('btnAddDocument').click();
    }
    const handleAddVideo = () => {
        document.getElementById('btnAddVideo').click();
    }
    const handleAddFileDoc = (e) => {
        e.persist();
        const param = e.target.files[0];
        setLstFileDoc(lstFileDoc => [...lstFileDoc, param]);
    }
    const handleAddFileVideo = (e) => {
        e.persist();
        const param = e.target.files[0];
        setLstFileVideo(lstFileVideo => [...lstFileVideo, param]);
    }

    const handleRemoveDoc = (name) => {
        setLstFileDoc(lstFileDoc.filter(item => item.name !== name));

    };

    const handleRemoveVideo = (name) => {
        setLstFileVideo(lstFileVideo.filter(item => item.name !== name));
    };

    const handleChangeName = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeSummary = (e) => {
        setSummary(e.target.value);
    }

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleChangPromotionPrice = (e) => {
        setPromotionPrice(e.target.value);
    }

    const handleImage = (e) => {
        e.persist();
        const param = e.target.files[0];
        setSrcImage(param)
        setIsShowImg("initial")
        let reader = new FileReader();
        reader.onload = function () {
            setShowImg(reader.result);
        };
        reader.readAsDataURL(param);
    }

    const onChangeCategories = (value) => {
        setIdCategory(value.key);
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.checked);
    }
    const resetImg = () => {
        refImg.current.value = "";
        setSrcImage(null)
        setShowImg(null)
        setIsShowImg("none")
    };
    const removeAllDataInsert = () => {
        setTitle('');
        setSummary('');
        setPrice('');
        setPromotionPrice('');
        setValueDes('');
        setSrcImage('');
        resetImg();
        setLstFileDoc([]);
        setLstFileVideo([]);
        setStatus(false);

    }

    const isValidate= ()=>{
        let temp=true;
        if (title==='')
        {
            temp=false
        }
        if(price<=0)
        {
            temp=false
        }
        if (idCategory === '-1') {
            temp=false
        }

        return temp;
    }

    const handleSaveCourse = async () => {
        setIsloading(true);
        if(isValidate()===false)
        {
            setIsloading(false);
            return toast.error('Please enter full course information!', {
                toastId: -10,
                autoClose: 2000,
            });
        }

        let isSuccess = false;

        const formData = new FormData();

        formData.append("name", title);
        formData.append("description", valueDes.replace(/<(.|\n)*?>/g, '').trim())
        formData.append("summary", summary)
        formData.append("image", srcImage)
        formData.append("category_id", idCategory)
        formData.append("created_by", userId)
        if (status === true) {
            formData.append("course_status_id", 1)
        } else formData.append("course_status_id", 2)
        formData.append("price", price)
        formData.append("promotion_price", promotionPrice)
        formData.append("course_field_id", 1);

        const res = await CallAPI('POST', formData, `/courses`);
        if (res.status === 1) {
            isSuccess = true;
            const idCourse = res.data.id;
            for (const item of lstFileDoc) {
                let dataDoc = new FormData();
                dataDoc.append('url', item)
                dataDoc.append('course_id', idCourse)
                dataDoc.append('name', item.name);

                const resDoc = await CallAPI('POST', dataDoc, '/documents');
                isSuccess = resDoc.status === 1;
            }
            for (const item of lstFileVideo) {
                let dataVideo = new FormData();
                dataVideo.append('url', item)
                dataVideo.append('course_id', idCourse)
                dataVideo.append('name', item.name);

                const resVideo = await CallAPI('POST', dataVideo, '/videos')
                isSuccess = resVideo.status === 1;
            }
        }

        if (isSuccess === true) {
            setIsloading(false)
            removeAllDataInsert();
            return toast.success("Saved", {toastId: 10, autoClose: 2000})
        } else {
            setIsloading(false);
            return toast.error("Save course failed, try again", {
                toastId: -10,
                autoClose: 2000,
            });
        }
    }
    return (
        <React.Fragment>
            <LoadingMask loading={isLoading} text={"loading..."}>
                <Header/>
                <div class="container main-container">
                    <div class="row">
                        <div class="col-lg-12 mt-5">
                            <h3 className="text-center mt-5 mb-5">Add Course</h3>
                            <div className="mt-5 mb-5">
                                <div className="form-group">
                                    <h6>Course name:</h6>
                                    <input onChange={handleChangeName}
                                           className="form-control" id="courseName"
                                           value={title}
                                           placeholder="Enter Course Name"/>
                                </div>
                                <div className="form-group">
                                    <h6>Summary:</h6>
                                    <input onChange={handleChangeSummary}
                                           className="form-control" id="summary"
                                           value={summary}
                                           placeholder="Summary"/>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>Course price:</h6>
                                            <input onChange={handleChangePrice}
                                                   type="number"
                                                   className="form-control"
                                                   placeholder="Price" id="price"
                                                   min="0.00" max="10000.00"
                                                   value={price}
                                                   step="0.01"/>
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Promotion price:</h6>
                                            <input onChange={handleChangPromotionPrice}
                                                   type="number"
                                                   className="form-control"
                                                   value={promotionPrice}
                                                   placeholder="Promotion Price"
                                                   id="promotionPrice" min="0.00" max="10000.00"
                                                   step="0.01"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h6>Course image</h6>
                                    <img src={showImg}
                                         style={{width: 293, height: 220, marginRight: 20, display: `${isShowImg}`}}/>
                                    <input type="file" id="image" accept=".png, .jpg" style={{cursor: "pointer"}}
                                           onChange={handleImage} ref={refImg}/>
                                </div>
                                <div className="form-group">
                                    <h6>Course description</h6>
                                    <ReactQuill style={{height: 200}} theme="snow" value={valueDes}
                                                onChange={setValueDes}/>
                                </div>
                                <div className="form-group" style={{marginTop: 60}}>
                                    <h6>Category</h6>
                                    <Menu onClick={onChangeCategories} style={{width: 200, border: '1'}}
                                          mode="vertical">
                                        <SubMenu key="sub2" title="Choose category">
                                            <SubMenu key="subMenuWeb" title="Web programming">
                                                {
                                                    listCategoryWeb.map((data) => {
                                                        return (
                                                            <Menu.Item key={data.id}>{data.name}</Menu.Item>
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                            <SubMenu key="subMenuMobile" title="Mobile programming">
                                                {
                                                    listCategoryMobile.map((data) => {
                                                        return (
                                                            <Menu.Item key={data.id}>{data.name}</Menu.Item>
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                        </SubMenu>
                                    </Menu>
                                </div>
                                <Button className="mt-2 b-group-color" type="primary"
                                        onClick={handleAddDoc}>
                                    <i className="fa fa-plus" style={{marginRight: 5, paddingTop: 2}}/>
                                    Add an document
                                </Button>
                                <input type="file" id="btnAddDocument" accept=".docs, .pdf"
                                       style={{cursor: "pointer", display: "none"}} onChange={handleAddFileDoc}/>
                                <div>
                                    {lstFileDoc.length > 0 &&
                                    lstFileDoc.map((data, index) => {
                                        return (
                                            <Card title={`Document ${index + 1}`} key={index}
                                                  extra={<a onClick={() => handleRemoveDoc(data.name)}><i
                                                      className="fa fa-trash"></i></a>} style={{marginTop: 20}}>
                                                <div style={{marginBottom: 20}}>
                                                    <h6>Name:</h6>
                                                    <span>{data.name}</span>
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                                <br/>
                                <Button className="mt-2 b-group-color" type="primary"
                                        onClick={handleAddVideo}>
                                    <i className="fa fa-plus" style={{marginRight: 5, paddingTop: 2}}/>
                                    Add an video
                                </Button>
                                <input type="file" id="btnAddVideo" accept=".avi,.mp4,.flv"
                                       style={{cursor: "pointer", display: "none"}} onChange={handleAddFileVideo}/>
                                <div>
                                    {lstFileVideo.length > 0 &&
                                    lstFileVideo.map((data, index) => {
                                        return (
                                            <Card title={`Video ${index + 1}`} key={index}
                                                  extra={<a onClick={() => handleRemoveVideo(data.name)}><i
                                                      className="fa fa-trash"></i></a>} style={{marginTop: 20}}>
                                                <div style={{marginBottom: 20}}>
                                                    <h6>Name:</h6>
                                                    <span>{data.name}</span>
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-primary" style={{marginTop: 30}}
                                        onClick={handleSaveCourse}>
                                    {isLoading ? '... ' :
                                        <i className="fas fa-save" style={{marginRight: 5, paddingTop: 2}}></i>}
                                    Save
                                </button>
                                <Checkbox style={{float: "right"}} checked={status}
                                          onChange={onChangeStatus}>Accomplished</Checkbox>
                            </div>

                        </div>
                    </div>

                </div>
                <ToastContainer position="bottom-center"/>
                <Footer/>
            </LoadingMask>
        </React.Fragment>

    )
}
export default AddCourse;
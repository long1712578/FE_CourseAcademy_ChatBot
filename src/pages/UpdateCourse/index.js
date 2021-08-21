import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from "../../component/footer";
import Header from "../../component/header";
import CallAPI from "../../until/callAPI"
import {toast, ToastContainer} from "react-toastify";
import Checkbox from "antd/es/checkbox/Checkbox";
import {Menu, Select} from "antd";
import 'react-toastify/dist/ReactToastify.css';
import {Card, Button} from "antd"
import {useParams} from "react-router";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import CallUnAuthorize from "../../until/callUnAuthorize";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loader from "../../component/loader";

const { SubMenu } = Menu;



const UpdateCourse = () => {
    const [isLoading, setIsloading] = useState(false);
    const [isFirstLoading, setIsFirstloading] = useState(false);
    const [idCategory, setIdCategory] = useState('-1');
    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [price, setPrice] = useState();
    const [promotionPrice, setPromotionPrice] = useState();
    const [srcImage, setSrcImage] = useState();
    const [valueDes, setValueDes] = useState('');
    const [status, setStatus] = useState(false);
    const [showImg, setShowImg] = useState();
    const [listCategoryWeb,setListCategoryWeb]=useState([]);
    const [listCategoryMobile,setListCategoryMobile]=useState([]);

    const [lstFileDoc, setLstFileDoc] = useState([]);
    const [lstFileVideo, setLstFileVideo] = useState([]);
    const refImg = useRef();
    const id = useParams();

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

    useEffect(() => {
        let isLoadSucces = true;
        setIsFirstloading(true);
        const fetchData = async () => {
            const res = await CallAPI("GET", null, `/guest-course/information/${id.id}`);
            if (res.status === 1) {
                const dataCourse = res.data.course[0];
                setIdCategory(dataCourse.category_id);
                setTitle(dataCourse.name);
                setValueDes(dataCourse.description);
                setSummary(dataCourse.summary);
                setPrice(dataCourse.price);
                setPromotionPrice(dataCourse.promotion_price);
                setSrcImage(dataCourse.image);
                setShowImg(dataCourse.image);
                if (dataCourse.course_status_id === 1) {
                    setStatus(true)
                } else setStatus(false)
            } else isLoadSucces = false;
            const resDoc = await CallAPI("GET", null, `/documents?course_id=${id.id}`);
            if (resDoc.status === 1) {
                const dataDoc = resDoc.data;
                dataDoc.forEach((item) => {
                    setLstFileDoc(lstFileDoc => [...lstFileDoc, item.document])
                })
            } else isLoadSucces = false;
            const resVideo = await CallAPI("GET", null, `/videos?course_id=${id.id}`);
            if (resVideo.status === 1) {
                const dataVideo = resVideo.data;
                dataVideo.forEach((item) => {
                    setLstFileVideo(lstFileVideo => [...lstFileVideo, item.video])
                })
            } else isLoadSucces = false;
            setIsFirstloading(false);
            if (!isLoadSucces) {
                return toast.error("Load course to update failed,try again", {
                    toastId: -10,
                    autoClose: 2000,
                });
            }

        }
        fetchData();
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            const resCateWeb = await CallUnAuthorize("GET", null, `/categories/field_id/1`);
            const resCateMobile = await CallUnAuthorize("GET", null, `/categories/field_id/2`);
            console.log(resCateWeb.data)
            if(resCateMobile.status === 1 && resCateWeb.status === 1) {

                setListCategoryWeb(resCateWeb.data)
                setListCategoryMobile(resCateMobile.data);
                //setListCategory(res.data);
            }
            else
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
    const handleAddFileDoc = async (e) => {
        e.persist();
        setIsloading(true);
        const param = e.target.files[0];
        let dataDoc = new FormData();
        dataDoc.append('url', param)
        dataDoc.append('course_id', id.id)
        dataDoc.append('name', param.name);

        const resDoc = await CallAPI('POST', dataDoc, `/documents`);
        setIsloading(false);
        if (resDoc.status === 1) {
            console.log(resDoc.data)
            setLstFileDoc(lstFileDoc => [...lstFileDoc, resDoc.data]);
            return toast.success("Updated", {toastId: 10, autoClose: 2000})
        } else {
            return toast.error("Update document failed, try again", {
                toastId: -10,
                autoClose: 2000,
            });
        }
    }
    const handleAddFileVideo = async (e) => {
        e.persist();
        setIsloading(true);
        const param = e.target.files[0];
        let dataVideo = new FormData();
        dataVideo.append('url', param)
        dataVideo.append('course_id', id.id)
        dataVideo.append('name', param.name);

        const resVideo = await CallAPI('POST', dataVideo, `/videos`);
        setIsloading(false);
        if (resVideo.status === 1) {
            setLstFileVideo(lstFileVideo => [...lstFileVideo, resVideo.data]);
            return toast.success("Updated", {toastId: 10, autoClose: 2000})
        } else {
            return toast.error("Update document failed, try again", {
                toastId: -10,
                autoClose: 2000,
            });
        }
    }

    const handleRemoveDoc = async (name, id) => {
        console.log(id);
        console.log(name)
       setIsloading(true);
        const resRemoveDoc = await CallAPI('DELETE', null, `/documents/${id}`);
        setIsloading(false);
        if (resRemoveDoc.status === 1) {
            setLstFileDoc(lstFileDoc.filter(item => item.name !== name));
            return toast.success("Updated", {toastId: 10, autoClose: 2000})
        } else {
            return toast.error("Update document failed, try again", {
                toastId: -10,
                autoClose: 2000,
            });
        }

    };
    const handleRemoveVideo = async (name, id) => {
        setIsloading(true);
        const resRemoveVideo = await CallAPI('DELETE', null, `/videos/${id}`);
        setIsloading(false);
        if (resRemoveVideo.status === 1) {
            setLstFileVideo(lstFileVideo.filter(item => item.name !== name));
            return toast.success("Updated", {toastId: 10, autoClose: 2000})
        } else {
            return toast.error("Update document failed, try again", {
                toastId: -10,
                autoClose: 2000,
            });
        }
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
        setSrcImage(param);
        let reader = new FileReader();
        reader.onload = function () {
            setShowImg(reader.result);
        };
        reader.readAsDataURL(param);
    }

    const onChangeCategories = (value) => {
        setIdCategory(value);
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.checked);
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
        let isSuccess = false;

        if(isValidate()===false)
        {
            setIsloading(false);
            return toast.error('Please enter full course information!', {
                toastId: -10,
                autoClose: 2000,
            });
        }

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
        formData.append("course_field_id", 3);

        const res = await CallAPI('PUT', formData, `/courses/${id.id}`);
        if (res.status === 1) {
            isSuccess = true;
        } else isSuccess = false;

        if (isSuccess === true) {
            setIsloading(false)
            return toast.success("Saved", {toastId: 10, autoClose: 2000})
        } else {
            setIsloading(false);
            return toast.error("Save course failed, try again", {
                toastId: -10,
                autoClose: 2000,
            });
        }
    }

    if (isFirstLoading) return (
        <>
            <Header/>
            <div style={{marginTop: 200}}>
                <Loader/>
            </div>
        </>
    )

    return (
        <React.Fragment>
            <LoadingMask loading={isLoading} text={"loading..."}>
                <Header/>
                <div className="container main-container">
                    <div className="row">
                        <div className="col-lg-12 mt-5">
                            <h3 className="text-center mt-5 mb-5">Update Course</h3>
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
                                    <img src={showImg} style={{width: 293, height: 220, marginRight: 20}}/>
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
                                    <Menu onClick={onChangeCategories} style={{ width: 200,border:'1' }} mode="vertical">
                                        <SubMenu key="sub2" title="Change category">
                                            <SubMenu key="subMenuWeb" title="Web programming">
                                                {
                                                    listCategoryWeb.map((data)=>{
                                                        return(
                                                            <Menu.Item key={data.id}>{data.name}</Menu.Item>
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                            <SubMenu key="subMenuMobile" title="Mobile programming">
                                                {
                                                    listCategoryMobile.map((data)=>{
                                                        return(
                                                            <Menu.Item key={data.id}>{data.name}</Menu.Item>
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                        </SubMenu>
                                    </Menu>
                                    <Checkbox style={{float: "right"}} checked={status}
                                              onChange={onChangeStatus}>Accomplished</Checkbox>
                                </div>
                                <Button className="mt-2 b-group-color" type="primary"
                                        onClick={handleAddDoc}>
                                    <i className="fa fa-plus" style={{marginRight: 5, paddingTop: 2}}/>
                                    Add an document
                                </Button>
                                <input type="file" id="btnAddDocument" accept=".docs, .pdf"
                                       style={{cursor: "pointer", display: "none"}} onChange={handleAddFileDoc}/>
                                <div>
                                    {lstFileDoc.length === 0 && <></>
                                    }
                                    {lstFileDoc.length > 0 &&
                                    lstFileDoc.map((data, index) => {
                                        return (
                                            <Card title={`Document ${index + 1}`} key={index}
                                                  extra={<a onClick={() => handleRemoveDoc(data.name, data.id)}><i
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
                                                  extra={<a onClick={() => handleRemoveVideo(data.name, data.id)}><i
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
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer/>
            </LoadingMask>
            <ToastContainer position="bottom-center"/>
        </React.Fragment>

    )
}
export default UpdateCourse;
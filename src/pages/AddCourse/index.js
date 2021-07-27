import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//Success POPUP
import Swal from 'sweetalert2'
import Footer from "../../component/footer";
import Header from "../../component/header";
import {useForm} from 'react-hook-form';
import CallAPI from "../../until/callAPI"
import {toast, ToastContainer} from "react-toastify";
import Checkbox from "antd/es/checkbox/Checkbox";
import {Select} from "antd";
import 'react-toastify/dist/ReactToastify.css';
import {Card, Button, Badge, Alert} from "antd"
import Loader from "../../component/loader";
const {Option} = Select;


const AddCourse = () => {
    const [isLoading,setIsloading]=useState(false);
    const [idCategory, setIdCategory] = useState('-1');
    const [title,setTitle]=useState();
    const [summary,setSummary]=useState();
    const [price,setPrice]= useState();
    const [promotionPrice,setPromotionPrice]= useState();
    const [srcImage, setSrcImage] = useState();
    const [valueDes, setValueDes] = useState('');
    const [status, setStatus] = useState(false);
    const [listCategory, setListCategory] = useState([]);

    const [lstFileDoc,setLstFileDoc]=useState([]);
    const [lstFileVideo,setLstFileVideo]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, `/categories`);
            if (res.status === 1) {
                setListCategory(res.data);
            } else return (res.err);
        }
        fetchData();
    }, [])


    const CardVideo=(id)=>{
        return(
            <Card title={`Video ${id.id}`}  extra={ <a  onClick={removeVideo(id.id)}><i className="fa fa-trash"></i></a>} style={{marginTop:20}} >
                <div style={{marginBottom:20}}>
                    <h6>Name:</h6>
                    <input/>
                </div>

                <input type="file" id="document"  accept=".avi, .mp4" style={{cursor: "pointer"}} />

            </Card>
        )
    }
    const removeVideo=(id)=>{
        console.log(id+'remove');
    }
    const handleAddDoc = () => {
        document.getElementById('btnAddDocument').click();
    }
    const handleAddVideo = () => {
        document.getElementById('btnAddVideo').click();
    }
    const handleAddFileDoc=(e)=>{
        e.persist();
        const param = e.target.files[0];
        setLstFileDoc(lstFileDoc=>[...lstFileDoc,param]);
        console.log(lstFileDoc)
    }
    const handleAddFileVideo=(e)=>{
        e.persist();
        const param = e.target.files[0];
        setLstFileVideo(lstFileVideo=>[...lstFileVideo,param]);
        console.log(lstFileDoc)
    }

    const handleRemoveDoc = (name) => {

        console.log(name)
        setLstFileDoc(lstFileDoc.filter(item => item.name !== name));

    };
    const handleRemoveVideo = (name) => {

        console.log(name)
        setLstFileVideo(lstFileVideo.filter(item => item.name !== name));

    };

    const handleChangeName = (e) =>{
        console.log(e.target.value);
        setTitle(e.target.value);
    }
    const handleChangeSummary = (e) => {
        console.log(e.target.value);
        setSummary(e.target.value);
    }
    const handleChangePrice = (e) => {
        console.log(e.target.value);
        setPrice(e.target.value);
    }

    const handleChangPromotionPrice = (e) =>{
        console.log(e.target.value);
        setPromotionPrice(e.target.value);
    }

    const handleImage = (e) => {
        e.persist();
        const param = e.target.files[0];
        setSrcImage(param)
    }

    const onChangeCategories = (value) => {
        setIdCategory(value);
        console.log(value)
    }

    const onChangeStatus = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setStatus(e.target.checked);
    }

    const handleSaveCourse = async () => {
        setIsloading(true);
        let isSuccess=false;
        if (idCategory === '-1') {
            setIdCategory('0');
            return;
        }
        const formData=new FormData();

        formData.append("name",title);
        formData.append("description",valueDes.replace(/<(.|\n)*?>/g, '').trim())
        formData.append("summary",summary)
        formData.append("image",srcImage)
        formData.append("category_id",idCategory)
        formData.append("created_by",11)
        if (status === true) {
            formData.append("course_status_id",1)
        } else formData.append("course_status_id",2)
        formData.append("price",price)
        formData.append("promotion_price",promotionPrice)
        formData.append("course_field_id",3);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const res = await CallAPI('POST', formData, `/courses`);
        console.log(res.status);
        if (res.status === 1) {
            isSuccess=true;
            const idCourse = res.data.id;
            console.log(lstFileDoc)
            console.log(lstFileVideo)
            lstFileDoc.forEach(async (item)=> {
                let dataDoc = new FormData();
                dataDoc.append('url', item)
                dataDoc.append('course_id', idCourse)
                dataDoc.append('name', item.name);
                for (var pair of dataDoc.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                const resDoc = await CallAPI('POST', dataDoc, '/documents');
                if (resDoc.status === 1)
                    isSuccess = true;
                else
                    isSuccess = false;
            })
                lstFileVideo.forEach(async (item) => {
                    let dataVideo = new FormData();
                    dataVideo.append('url', item)
                    dataVideo.append('course_id', idCourse)
                    dataVideo.append('name', item.name);
                    for (var pair of dataVideo.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                    }
                    const resVideo = await CallAPI('POST', dataVideo, '/videos')
                    if (resVideo.status === 1)
                        isSuccess = true;
                    else
                        isSuccess = false;
                })
            }

        if (isSuccess===true) {
            setIsloading(false)
            return toast.success("Saved", {toastId: 10, autoClose: 2000})
        } else {
            return toast.error("Save course failed, try again", {
                toastId: -10,
                autoClose: 2000,
            });
        }
    }
    return (
        <React.Fragment>
            <Header/>
            <div class="container main-container">
                <div class="row">
                    <div class="col-lg-12 mt-5">
                        <h3 className="text-center mt-5 mb-5">Reactjs Eccommerce Site - Add Product</h3>
                        <div className="mt-5 mb-5">
                            <div className="form-group">
                                <h6>Course name:</h6>
                                <input onChange={handleChangeName}
                                       className="form-control" id="courseName"
                                       placeholder="Enter Course Name"/>
                            </div>
                            <div className="form-group">
                                <h6>Summary:</h6>
                                <input onChange={handleChangeSummary}
                                       type="text"
                                       className="form-control" id="summary"
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
                                               step="0.01" ></input>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Promotion price:</h6>
                                        <input onChange={handleChangPromotionPrice}
                                               type="number"
                                               className="form-control"
                                               placeholder="Promotion Price"
                                               id="promotionPrice" min="0.00" max="10000.00"
                                               step="0.01" ></input>
                                    </div>
                                </div>


                            </div>
                            <div className="form-group">
                                <h6>Course image</h6>
                                <input type="file" id="image"  accept=".png, .jpg" style={{cursor: "pointer"}} onChange={handleImage}/>
                            </div>
                            <div className="form-group">
                                <h6>Course description</h6>
                                <ReactQuill style={{height: 200}} theme="snow" value={valueDes} onChange={setValueDes}/>
                            </div>
                            <div className="form-group" style={{marginTop: 60}}>
                                <h6>Category</h6>
                                <Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="Select a category"
                                    optionFilterProp="children"
                                    onChange={onChangeCategories}
                                    onSearch
                                >
                                    {
                                        listCategory.map((data, index) => {
                                            return (
                                                <Option key={index} value={data.id}>{data.name}</Option>
                                            )
                                        })
                                    }
                                </Select>,
                                <Checkbox style={{float:"right"}} onChange={onChangeStatus}>Accomplished</Checkbox>
                            </div>
                            {
                                idCategory === '0' &&
                                <div>
                                    <span id="warningOption"
                                          style={{color: "red", marginTop: 5}}>Please select category</span>
                                </div>
                            }
                            <Button className="mt-2 b-group-color" type="primary"
                                    onClick={handleAddDoc}>
                                <i className="fa fa-plus" style={{marginRight: 5, paddingTop: 2}}/>
                                Add an document
                            </Button>
                            <input type="file" id="btnAddDocument"  accept=".docs, .pdf" style={{cursor: "pointer",display:"none"}}  onChange={handleAddFileDoc}/>
                            <div>
                                {lstFileDoc.length===0&& <></>
                                }
                                {lstFileDoc.length>0&&
                                    lstFileDoc.map((data,index)=>{
                                    return(
                                            <Card title={`Document ${index+1}`} key={index} extra={ <a onClick={()=>handleRemoveDoc(data.name)}><i className="fa fa-trash"></i></a>} style={{marginTop:20}} >
                                                <div style={{marginBottom:20}}>
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
                            <input type="file" id="btnAddVideo"  accept=".avi,.mp4,.flv" style={{cursor: "pointer",display:"none"}}  onChange={handleAddFileVideo}/>
                            <div>
                                {lstFileVideo.length>0&&
                                lstFileVideo.map((data,index)=>{
                                    return(
                                        <Card title={`Video ${index+1}`} key={index} extra={ <a onClick={()=>handleRemoveVideo(data.name)}><i className="fa fa-trash"></i></a>} style={{marginTop:20}} >
                                            <div style={{marginBottom:20}}>
                                                <h6>Name:</h6>
                                                <span>{data.name}</span>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary" style={{marginTop:30}} onClick={handleSaveCourse}>
                                {isLoading ? <Loader /> : null }
                                <i className="fas fa-save" style={{marginRight: 5, paddingTop: 2}}></i>Save</button>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer position="bottom-center"/>
            <Footer/>
        </React.Fragment>

    )
}
export default AddCourse;
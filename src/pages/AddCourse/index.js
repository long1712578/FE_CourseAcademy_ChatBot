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

const {Option} = Select;
let incrementDoc=0;
let incrementVideo=0;
const AddCourse = () => {
    const [valueDes, setValueDes] = useState('');
    const [status, setStatus] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [idCategory, setIdCategory] = useState('-1');
    const [srcImage, setSrcImage] = useState();
    const {register, handleSubmit} = useForm({shouldUseNativeValidation: true});
    const [lstDoc,setLstDoc]=useState([]);
    const [lstVideo,setLstVideo]=useState([]);
    const [lstFileDoc,setLstFileDoc]=useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, `/categories`);
            if (res.status === 1) {
                setListCategory(res.data);
            } else return (res.err);
        }
        fetchData();
    }, [])

    const handleAddDoc = () => {
        incrementDoc++;
        setLstDoc(lstDoc.concat(
                <CardDoc key={incrementDoc}
                        id={incrementDoc}></CardDoc>
        ))
    }
    const CardDoc=(id)=>{
        return(
            <Card title={`Document ${id.id}`}  extra={ <a  onClick={removeDoc(id.id)}><i className="fa fa-trash"></i></a>} style={{marginTop:20}} >
                <div style={{marginBottom:20}}>
                    <h6>Name:</h6>
                    <input/>
                </div>

                <input type="file" id="document"  accept=".docs, .pdf" style={{cursor: "pointer"}}  onChange={handleAddFileDoc}/>

            </Card>
        )
    }
    const removeDoc=(id)=>{
        console.log(id+'ưeqw');
    }
    const handleAddVideo = () => {
        incrementVideo++;
        setLstVideo(lstVideo.concat(
            <CardVideo key={incrementVideo}
                     id={incrementVideo}></CardVideo>
        ))
    }
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
        console.log(id+'ưeqw');
    }
    const handleImage = (e) => {
        e.persist();
        const param = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setSrcImage(reader.result)
        }
        reader.readAsDataURL(param);
        console.log(reader);

    }
    const handleAddFileDoc=(e)=>{
        e.persist();
        const param = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(param);
        setLstFileDoc(reader);
        console.log(reader);
    }
    const onChangeStatus = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setStatus(e.target.checked);
    }
    const onChangeCategories = (value) => {
        setIdCategory(value);
        console.log(value)
    }
    const onSubmit = async (data) => {
        if (idCategory === '-1') {
            setIdCategory('0');
            return;
        }
        if (status === true) {
            data = {...data, course_status_id: 1};
        } else data = {...data, course_status_id: 2};
        data = {...data, image: srcImage};
        data = {...data, category_id: idCategory};
        data = {...data, description: valueDes.replace(/<(.|\n)*?>/g, '').trim()};

        // thêm tay ??
        data = {...data, created_by: 11};
        data = {...data, course_field_id: 3};
        console.log(JSON.stringify(data))
        const res = await CallAPI('POST', data, `/courses`);
        console.log(res.status)
        if (res.status === 1) {
            console.log('success')
            return toast.success("Saved", {toastId: 10, autoClose: 2000})
        } else {
            console.log(res.err)
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
                        <form className="mt-5 mb-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <h6>Course name:</h6>
                                <input {...register('name', {required: "Please enter course name."})} type="text"
                                       className="form-control" id="courseName"
                                       placeholder="Enter Course Name"/>
                            </div>
                            <div className="form-group">
                                <h6>Summary:</h6>
                                <input type="text" className="form-control" id="summary"
                                       placeholder="Summary"  {...register('summary')}/>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Course price:</h6>
                                        <input type="number" className="form-control" placeholder="Price" id="price"
                                               min="0.00" max="10000.00"
                                               step="0.01" {...register('price', {required: "Please enter price."})}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Promotion price:</h6>
                                        <input type="number" className="form-control" placeholder="Promotion Price"
                                               id="promotionPrice" min="0.00" max="10000.00"
                                               step="0.01" {...register('promotion_price', {required: "Please enter promotion price."})} ></input>
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
                            <div>
                                {lstDoc}
                            </div>
                            <br/>
                            <Button className="mt-2 b-group-color" type="primary"
                                    onClick={handleAddVideo}>
                                <i className="fa fa-plus" style={{marginRight: 5, paddingTop: 2}}/>
                                Add an video
                            </Button>
                            <div>
                                {lstVideo}
                            </div>
                            <div className="form-group" style={{marginTop: 20}}>
                                <button type="submit" className="btn btn-primary">Save course</button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
            <ToastContainer position="bottom-center"/>
            <Footer/>
        </React.Fragment>

    )
}
export default AddCourse;
import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//Success POPUP
import Swal from 'sweetalert2'
import Footer from "../../component/footer";
import Header from "../../component/header";

const AddCourse = () => {
    const [options, setOption] = useState('')
    const [value, setValue] = useState('');
    const addCourse = () => {
        console.log("add course")
    }
    return (
        <React.Fragment>
            <Header/>
            <div class="container main-container">
                <div class="row">
                    <div class="col-lg-12 mt-5">
                        <h3 className="text-center mt-5 mb-5">Reactjs Eccommerce Site - Add Product</h3>
                        <form className="mt-5 mb-5">
                            <div className="form-group">
                                <h6>Course name:</h6>
                                <input type="text" className="form-control" id="coursename"
                                       placeholder="Enter Course Name"/>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Course price:</h6>
                                        <input type="number" className="form-control" placeholder="Price" id="price"
                                               min="0.00" max="10000.00" step="0.01"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Promotion price:</h6>
                                        <input type="number" className="form-control" placeholder="Promotion Price"
                                               id="promotionPrice" min="0.00" max="10000.00" step="0.01"></input>
                                    </div>
                                </div>


                            </div>
                            <div className="form-group">
                                <h6>Course mage</h6>
                                <input type="file" id="image" style={{cursor:"pointer"}}/>
                            </div>
                            <div className="form-group">
                                <h6>Course description</h6>
                                <ReactQuill theme="snow" value={value} onChange={setValue}/>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={addCourse}>Submit</button>
                        </form>

                    </div>


                </div>

            </div>
            <Footer/>
        </React.Fragment>

    )
}
export default AddCourse;
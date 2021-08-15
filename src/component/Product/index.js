import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import CallUnAuthorize from "../../until/callUnAuthorize";
import {toast} from "react-toastify";

const ProductCart= ({idCourse,nameCourse,nameTeacher,price,promotionPrice,rating,nameCategory,srcImg,listCourseHighLight,listCourseNew})=>{
    // const [listCourseHighLight, setListCourseHighLight] = useState([]);
    // const [listNewCourse, setListNewCourse] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const resCourseHighLight = await CallUnAuthorize("GET", null, "/guest-course/most-highlight");
    //         const resNewCourse = await CallUnAuthorize("GET", null, "/guest-course/new-course");
    //         if(resCourseHighLight.status===1&&resNewCourse===1)
    //         {
    //             console.log(resNewCourse)
    //             console.log("hi")
    //             setListCourseHighLight(resCourseHighLight.data);
    //             setListNewCourse(resNewCourse.data);
    //         }
    //         else{
    //             toast.error("Something went wrong. Try later")
    //         }
    //     }},[])
    return(
        <figure className="card card-product-grid">
            <Link className="link-no-decoration" to={`courses/${idCourse}`}>
            <div className="img-wrap">
                {
                    listCourseHighLight.map((data,index)=>{
                        return(
                                data.id===idCourse&&<>
                                    <span className="badge badge-danger"> HOT </span>
                                </>
                        )
                    })
                }
                {
                    listCourseNew.map((data,index)=>{
                        return(
                            data.id===idCourse&&<>
                                <span className="badge badge-danger" style={{backgroundColor:"green"}}> New </span>
                            </>
                        )
                    })

                }

                <span className="badge badge-gray" style={{float:"right"}}>Category: {nameCategory}</span>
                <img src={srcImg}/>
                <a className="btn-overlay" href="#"><i
                    className="fa fa-search-plus"></i> Quick view</a>
            </div>
            </Link>
            <figcaption className="info-wrap">
                <div className="fix-height">
                    <Link className="link-no-decoration" to={`courses/${idCourse}`}>
                    <a className="title">{nameCourse}</a>
                    </Link>
                    <a style={{color:"darkred"}}>Teacher: {nameTeacher}</a>
                    <div className="price-wrap mt-2">
                        {
                            (promotionPrice!==null&&promotionPrice!==0)&&<>
                                <span className="price">{promotionPrice}</span>
                                <del className="price-old">{price}</del>
                            </>
                        }
                        {
                            (promotionPrice===null||promotionPrice===0)&&<>
                                <span className="price">{price}</span>
                            </>
                        }
                        <span style={{float:"right"}}>Rating: {rating}<span
                            className="fa fa-star checked"></span></span>
                    </div>
                </div>
                <a href="#" className="btn btn-block btn-primary">Register Now! </a>
            </figcaption>
        </figure>

    )
}
export  default ProductCart;
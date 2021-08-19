import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import CallAPI from "../../until/callAPI";

const ProductCart=({idCourse,nameCourse,nameTeacher,price,promotionPrice,rating,nameCategory})=>{
    const user = JSON.parse(localStorage.getItem("user"));
    const [isOrder, setIsOrder] = useState(false);

    const fetchOrder = async () => {
        try{
          if(user && user.authenticated){
            const res = await CallAPI("GET", null, `/orders/${idCourse}`);
            if (res.status === 1 && res.data.id) {
              setIsOrder(true);
            } else setIsOrder(false);
          }
        }catch(e){
          setIsOrder(false);
        }
      };

    useEffect(() => {
            if(user){
                fetchOrder();
            }
        
      }, [idCourse]);
    return(
        <figure className="card card-product-grid">
            <Link className="link-no-decoration" to={`courses/${idCourse}`}>
            <div className="img-wrap">
                <span className="badge badge-danger"> NEW </span>
                <span className="badge badge-gray" style={{float:"right"}}>Category: {nameCategory}</span>
                <img src="assets/images/items/course.jpg"/>
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
                        <span className="price">{promotionPrice}</span>
                        <del className="price-old">{price}</del>
                        <span style={{float:"right"}}>Rating: {rating}<span
                            className="fa fa-star checked"></span></span>
                    </div>
                </div>
                {
                    (!user) ?
                    <a href={`/login`} className="btn btn-block btn-primary">Register Now! </a>
                    :
                    (
                        (isOrder)
                        ?
                        <div></div>
                        :
                        <a href={`/courses/${idCourse}/register`} className="btn btn-block btn-primary">Register Now! </a>
                    )
                }
            </figcaption>
        </figure>

    )
}
export  default ProductCart;
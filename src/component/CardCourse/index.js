import React from 'react'
import {Link} from "react-router-dom";

const ProductCart = ({idCourse, nameCourse, nameTeacher, price, promotionPrice, rating, nameCategory, srcImg}) => {
    return (
        <figure className="card card-product-grid">
            <Link className="link-no-decoration" to={`courses/${idCourse}`}>
                <div className="img-wrap">
                    <span className="badge badge-gray" style={{float: "right"}}>Category: {nameCategory}</span>
                    <img src={srcImg} style={{width: 293, height: 220}} alt=""/>
                    <a className="btn-overlay" href="#"><i
                        className="fa fa-search-plus"></i> Quick view</a>
                </div>
            </Link>
            <figcaption className="info-wrap">
                <div className="fix-height">
                    <Link className="link-no-decoration" to={`courses/${idCourse}`}>
                        <a className="title">{nameCourse}</a>
                    </Link>
                    <a style={{color: "darkred"}}>Teacher: {nameTeacher}</a>
                    <div className="price-wrap mt-2">
                        <span className="price">{promotionPrice}</span>
                        <del className="price-old">{price}</del>
                        {
                            rating!==0&&
                            <>
                                    <span style={{float:"right"}}>Rating: {rating}<span
                                        className="fa fa-star checked"></span></span>
                            </>
                        }
                    </div>
                </div>
                <a href={`update-course/${idCourse}`} className="btn btn-block btn-primary">Update Course</a>
            </figcaption>
        </figure>

    )
}
export default ProductCart;
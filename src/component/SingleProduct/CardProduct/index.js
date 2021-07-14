import moment from "moment";
import React from "react";

const CardProduct=({img,name,summary,description,rating,promotionPrice,price,lastUpdate,numberOfRating,numberOfEnrroled})=>{
    return(
        <article className="card">
            <div className="card-body">
                <div className="row">
                    <aside className="col-md-6">
                        <article className="gallery-wrap">
                            <div className="card img-big-wrap">
                                <a href="#"> <img src={`${img}`}/></a>
                            </div>
                        </article>
                    </aside>
                    <main className="col-md-6">
                        <article>
                            <h3 className="title">{name}</h3>
                            <div className="mb-3">
                                <h6>Summary:</h6>
                                <ul className="list-dots mb-0">
                                    <li>{summary}</li>
                                </ul>
                            </div>
                            <hr/>
                            <div>
                                {
                                    numberOfRating>0?
                                        <span className="label-rating mr-3 text-muted">Rating: {rating} <span
                                            className="fa fa-star checked"></span></span>
                                        :
                                        <>
                                            <span style={{marginLeft:5,color:"red"}}>No one has rated it yet</span>
                                        </>
                                }
                            </div>
                            <div>
                                <span className="label-rating mr-3 text-muted">Number of ratings: {numberOfRating}</span>
                            </div>
                            <div>
                                <span className="label-rating mr-3 text-muted">Number of students enrolled: {numberOfEnrroled}</span>
                            </div>
                            <div>
                                <a className="btn-link mr-3 text-muted" style={{marginLeft:10}}> <i
                                    className="fa fa-heart"></i> Save to watch list</a>
                            </div>
                            <hr/>
                            <div className="mb-3">
                                <h6>Decription:</h6>
                                <ul className="list-dots mb-0">
                                    <li>{description}</li>
                                </ul>
                            </div>
                            <hr/>

                            <div className="mb-3">
                                <var className="price h4">{promotionPrice}</var> <br/>
                                <del className="price-old">{price}</del>
                            </div>

                            <div className="mb-4">
                                <a href="#" className="btn btn-primary mr-1">Buy now</a>
                                <a href="#" className="btn btn-light">Add to card</a>
                            </div>
                            <div>
                                Last update: {lastUpdate}
                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </article>
    )
}
export default CardProduct;
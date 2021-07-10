import React, {useEffect, useState} from "react";
import CallAPI from "../../until/callAPI";
import {toast} from "react-toastify";
import {useParams} from "react-router";
import Header from "../../component/header";
import Footer from "../../component/footer";
import Loader from "../../component/loader";
const   Product=()=>{
    const [course,setCourse]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const id=useParams();
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, `/guest-course/information/${id.id}`);
            if(res.status === 1) {
                setCourse(res.data);
                setIsLoading(false);
            }
            else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])
    console.log(course)
    if(isLoading) return (
        <React.Fragment>
            <div style={{marginLeft:'200px'}}>
                <Loader/>
            </div>
        </React.Fragment>
    )
    return(
        <React.Fragment>
            <section className="section-content padding-y bg">
                <div className="container">

                    <article className="card">
                        <div className="card-body">
                            <div className="row">
                                <aside className="col-md-6">
                                    <article className="gallery-wrap">
                                        <div className="card img-big-wrap">
                                            <a href="#"> <img src=""/></a>
                                        </div>
                                    </article>
                                </aside>
                                <main className="col-md-6">
                                    <article>
                                        <a href="#" className="text-primary btn-link">Course</a>
                                        <h3 className="title">{course.name}</h3>
                                        <div>
                                            <ul className="rating-stars">

                                            </ul>
                                            <span className="label-rating mr-3 text-muted">{course.rating_average}<span
                                                className="fa fa-star checked"></span></span>
                                            <a href="#" className="btn-link  mr-3 text-muted"> <i
                                                className="fa fa-heart"></i> Save to watch list </a>
                                        </div>

                                        <hr/>

                                        <div className="mb-3">
                                            <h6>Course Description</h6>
                                            <ul className="list-dots mb-0">
                                                <li>{course.description}</li>
                                            </ul>
                                        </div>

                                        <div className="form-group">
                                            <label className="text-muted">Available sizes</label>
                                            <div>
                                                <label className="js-check btn btn-check active mr-1">
                                                    <input type="radio" name="option_size" value="option1" checked=""/>
                                                    <span>Small</span>
                                                </label>
                                                <label className="js-check btn btn-check mr-1">
                                                    <input type="radio" name="option_size" value="option1"/>
                                                    <span>Medium</span>
                                                </label>
                                                <label className="js-check btn btn-check mr-1">
                                                    <input type="radio" name="option_size" value="option1"/>
                                                    <span>Large</span>
                                                </label>
                                                <label className="js-check btn btn-check disabled">
                                                    <input type="radio" name="option_size" disabled="" value="option1"/>
                                                    <span>Babies</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <var className="price h4">$230.00</var> <br/>
                                            <span className="monthly">$32.00 / monthly <a href="#"
                                                                                          className="btn-link">installment </a></span>
                                        </div>

                                        <div className="mb-4">
                                            <a href="#" className="btn btn-primary mr-1">Buy now</a>
                                            <a href="#" className="btn btn-light">Add to card</a>
                                        </div>

                                    </article>
                                </main>
                            </div>
                        </div>
                    </article>
                    <article className="card mt-5">
                        <div className="card-body">
                            <div className="row">
                                <aside className="col-md-6">
                                    <h5>Parameters</h5>
                                    <dl className="row">
                                        <dt className="col-sm-3">Display</dt>
                                        <dd className="col-sm-9">13.3-inch LED-backlit display with IPS</dd>

                                        <dt className="col-sm-3">Processor</dt>
                                        <dd className="col-sm-9">2.3GHz dual-core Intel Core i5</dd>

                                        <dt className="col-sm-3">Camera</dt>
                                        <dd className="col-sm-9">720p FaceTime HD camera</dd>

                                        <dt className="col-sm-3">Memory</dt>
                                        <dd className="col-sm-9">8 GB RAM or 16 GB RAM</dd>

                                        <dt className="col-sm-3">Graphics</dt>
                                        <dd className="col-sm-9">Intel Iris Plus Graphics 640</dd>
                                    </dl>
                                </aside>
                                <aside className="col-md-6">
                                    <h5>Features</h5>
                                    <ul className="list-check">
                                        <li>Best performance of battery</li>
                                        <li>5 years warranty for this product</li>
                                        <li>Amazing features and high quality</li>
                                        <li>Best performance of battery</li>
                                        <li>5 years warranty for this product</li>
                                    </ul>
                                </aside>
                            </div>
                            <hr/>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </article>
                </div>


            </section>
            <Footer/>
        </React.Fragment>

    )
}
export default Product;
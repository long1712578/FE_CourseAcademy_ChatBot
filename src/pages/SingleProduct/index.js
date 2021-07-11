import React, {useEffect, useState} from "react";
import CallAPI from "../../until/callAPI";
import {toast} from "react-toastify";
import {useParams} from "react-router";
import Header from "../../component/header";
import Footer from "../../component/footer";
import Loader from "../../component/loader";
import {EyeOutlined} from "@ant-design/icons";
import {Card, Carousel} from "antd";
import moment from 'moment';
const Product=()=>{
    const [course,setCourse]=useState();
    const [rating,setRating]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const [mostBuySameCategory,setMostBuySameCategory]=useState();
    const [teacher,setTeacher]=useState();
    const id=useParams();
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, `/guest-course/information/${id.id}`);
            if(res.status === 1) {
                setCourse(res.data.course[0]);
                setRating(res.data.countRate);
                setMostBuySameCategory(res.data.mostBuySameCategory);
                setTeacher(res.data.teacher[0]);
                    setIsLoading(false);
            }
            else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])
    console.log(course)
    console.log(rating)
    if(isLoading) return (
        <React.Fragment>
            <Header/>
            <div style={{marginLeft:'200px'}}>
                <Loader/>
            </div>
        </React.Fragment>
    )
    return(
        <React.Fragment>
            <Header/>
            <section className="section-content padding-y bg">
                <div className="container">
                    <article className="card">
                        <div className="card-body">
                            <div className="row">
                                <aside className="col-md-6">
                                    <article className="gallery-wrap">
                                        <div className="card img-big-wrap">
                                            <a href="#"> <img src={`${course.image}`}/></a>
                                        </div>
                                    </article>
                                </aside>
                                <main className="col-md-6">
                                    <article>
                                        <h3 className="title">{course.name}</h3>
                                        <div className="mb-3">
                                            <h6>Decription:</h6>
                                            <ul className="list-dots mb-0">
                                                <li>{course.description}</li>
                                            </ul>
                                        </div>
                                        <hr/>
                                        <div>
                                            <span className="label-rating mr-3 text-muted">Rating: {course.rating_average} <span
                                                className="fa fa-star checked"></span></span>
                                        </div>
                                        <div>
                                            <span className="label-rating mr-3 text-muted">Number of ratings: {rating.length}</span>
                                        </div>
                                        <div>
                                          <span className="label-rating mr-3 text-muted">Number of students enrolled: {rating.length}</span>
                                        </div>
                                        <div>
                                            <a className="btn-link mr-3 text-muted" style={{marginLeft:10}}> <i
                                                className="fa fa-heart"></i> Save to watch list</a>
                                        </div>

                                        <hr/>

                                        <div className="mb-3">
                                            <var className="price h4">{course.promotion_price}</var> <br/>
                                            <del className="price-old">{course.price}</del>
                                        </div>

                                        <div className="mb-4">
                                            <a href="#" className="btn btn-primary mr-1">Buy now</a>
                                            <a href="#" className="btn btn-light">Add to card</a>
                                        </div>
                                        <div>
                                            Last update: {moment(course.last_update).format('YYYY-MM-DD hh:mm:ss').toString()}
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
                                    <h5>Teacher</h5>
                                    <dl className="row">
                                        <dt className="col-sm-3">Name</dt>
                                        <dd className="col-sm-9">{teacher.fullname}</dd>

                                        <dt className="col-sm-3">Email</dt>
                                        <dd className="col-sm-9">{teacher.email}</dd>

                                        <dt className="col-sm-3">Phone number</dt>
                                        <dd className="col-sm-9">{teacher.phone}</dd>

                                        <dt className="col-sm-3">Address</dt>
                                        <dd className="col-sm-9">{teacher.address}</dd>

                                        <dt className="col-sm-3">Gender</dt>
                                        {
                                            teacher.gender==1&&
                                            <dd className="col-sm-9">Man
                                            </dd>
                                        }
                                        {
                                            teacher.gender==0&&
                                            <dd className="col-sm-9">Woman
                                            </dd>
                                        }

                                    </dl>
                                </aside>
                                <aside className="col-md-6">
                                    <h5>Features</h5>
                                    <ul className="list-check">
                                        <li>Easy to learn</li>
                                        <li>Highly-professional trained</li>
                                        <li>Create employment conditions after completion</li>
                                        <li>Best performance of courses</li>
                                        <li>Job support</li>
                                    </ul>
                                </aside>
                            </div>
                            <hr/>
                            <p>
                                This is a teacher with extensive experience in the field of programming, invited from prestigious universities. Teachers are always dedicated and try to help and teach their students.
                            </p>
                        </div>
                    </article>
                    <article>

                    </article>
                    <article className="card mt-5">
                        <div style={{marginTop:20,marginBottom:20}}>
                            <h5>The most purchased other courses in the same category</h5>
                        </div>
                        <Carousel autoplay>
                            {
                                mostBuySameCategory.length > 0 ?
                                    mostBuySameCategory.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <h3>
                                                    <Card title={data.name} style={{
                                                        width: '100%',
                                                        backgroundColor: '#e5d5c1',
                                                        height: '220px',
                                                        margin: 'auto',
                                                        textAlign: 'center',
                                                    }}
                                                          loading={isLoading}
                                                    >
                                                        <div style={{marginTop: '15px'}}>
                                                            <p style={{float: 'left'}}>
                                                                Number of subscribers : {data.tNumber}
                                                            </p>
                                                        </div>
                                                    </Card>
                                                </h3>
                                            </div>
                                        )
                                    })
                                    :
                                    <>
                                        <div style={{textAlign: "center",verticalAlign:"middle",backgroundColor:'white',width:'100%',height:'260px',lineHeight: '260px'}} className="flex-row justify-content-center" >
                                            <h7 style={{fontSize: 30, fontWeight: 350,textAlign:"center",marginTop:100}}>There are no The most purchased other courses in the same category!</h7>
                                        </div>
                                    </>
                            }
                        </Carousel>
                    </article>
                    <article className="card mt-5">
                        <div className="container mt-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-8">
                                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                                        <h5>Unread comments(6)</h5>
                                        <div className="buttons"> <span
                                            className="badge bg-white d-flex flex-row align-items-center"> <span
                                            className="text-primary">Comments "ON"</span>
                        <div className="form-check form-switch"> <input className="form-check-input" type="checkbox"
                                                                        id="flexSwitchCheckChecked" checked/> </div>
                    </span></div>
                                    </div>
                                    <div className="card p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="user d-flex flex-row align-items-center"></div>
                                            <small>2 days ago</small>
                                        </div>
                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                            <div className="reply px-4"><small>Remove</small> <span
                                                className="dots"></span> <small>Reply</small> <span
                                                className="dots"></span> <small>Translate</small></div>
                                            <div className="icons align-items-center"><i
                                                className="fa fa-star text-warning"></i> <i
                                                className="fa fa-check-circle-o check-icon"></i></div>
                                        </div>
                                    </div>
                                    <div className="card p-3 mt-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="user d-flex flex-row align-items-center">
                                            </div>
                                            <small>3 days ago</small>
                                        </div>
                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                            <div className="reply px-4"><small>Remove</small> <span
                                                className="dots"></span> <small>Reply</small> <span
                                                className="dots"></span> <small>Translate</small></div>
                                            <div className="icons align-items-center"><i
                                                className="fa fa-check-circle-o check-icon text-primary"></i></div>
                                        </div>
                                    </div>
                                    <div className="card p-3 mt-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="user d-flex flex-row align-items-center"> </div>
                                            <small>3 days ago</small>
                                        </div>
                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                            <div className="reply px-4"><small>Remove</small> <span
                                                className="dots"></span> <small>Reply</small> <span
                                                className="dots"></span> <small>Translate</small></div>
                                            <div className="icons align-items-center"><i
                                                className="fa fa-user-plus text-muted"></i> <i
                                                className="fa fa-star-o text-muted"></i> <i
                                                className="fa fa-check-circle-o check-icon text-primary"></i></div>
                                        </div>
                                    </div>
                                    <div className="card p-3 mt-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="user d-flex flex-row align-items-center"></div>

                                            <small>3 days ago</small>
                                        </div>
                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                            <div className="reply px-4"><small>Remove</small> <span
                                                className="dots"></span> <small>Reply</small> <span
                                                className="dots"></span> <small>Translate</small></div>
                                            <div className="icons align-items-center"><i
                                                className="fa fa-check-circle-o check-icon text-primary"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

            </section>

            <Footer/>
        </React.Fragment>

    )
}
export default Product;
import React from "react"
import Header from "../../component/header";
import Footer from "../../component/footer";
import './introduce.css';

const Introduce = () =>
{

    return(
        <div>
            <React.Fragment>
                <Header/>
                    <div className="container">
                        <ul className="breadcrumb">
                            <li>
                                <a title="home" href="/">
                                    <i class="fas fa-home introduce"></i>
                                </a>
                            </li>
                            <li>
                            <i class="fas fa-chevron-right"></i>&nbsp; Introduction to courses
                            </li>
                        </ul>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="blog-single-content">
                                    <div className="post post-single">
                                        <div className="post-content">
                                            <h2>A) Target</h2>
                                            <p>Whether you want to learn or to share what you know, you’ve come to the right place. 
                                                 As a global destination for online learning, we connect people through knowledge.</p>
                                            <p>The future of work is changing rapidly. Organizations must compete globally and adapt locally.
                                                Performance is directly tied to the ability to learn, unlearn, and relearn.
                                                ZilLearn delivers scalable solutions for personal and organizational growth with value and vision.</p>
                                            <h2>B) Core values</h2>
                                            <p>The core value of Academy is the value of knowledge and skills brought to each of its members as a
                                                 prerequisite in all Academy activities. Academy will always work non-stop to enhance that value.</p>
                                            <h2>C) Development strategy</h2>
                                            <p>The development orientation is to become a reputable online training channel that is a bridge for
                                                 businesses and professionals. It helps to increase the competitiveness of programmers and finally,
                                                  supports building a well-developed IT platform for Vietnam.</p>
                                            <p className="author-signature">Hồ Chí Minh, ngày 25 tháng 04 năm 2021
                                                <br />
                                                Sáng lập Academy: Huynh Tung Long
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
            </React.Fragment>
        </div>
    )
}

export default Introduce
import React from 'react'
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="section-header">
            <section className="header-main border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-4">
                            <Link to={`/`}>
                                <a className="brand-wrap">
                                    Company Name
                                </a>
                            </Link>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                        {/*    <form action="#" className="search">*/}
                        {/*        <div className="input-group w-100">*/}
                        {/*            <input type="text" className="form-control" placeholder="Search"/>*/}
                        {/*            <div className="input-group-append">*/}
                        {/*                <button className="btn btn-primary" type="submit">*/}
                        {/*                    <i className="fa fa-search"></i>*/}
                        {/*                </button>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </form>*/}
                            <nav className="header__menu">
                                <ul>
                                    <Link to={`/`}>
                                        <li className="active" style={{marginRight:20}}>
                                            <a>Home</a>
                                        </li>
                                    </Link>
                                    <Link to={`courses`} >
                                        <li style={{marginRight:20}}>
                                            <a>Courses</a>
                                        </li>
                                   </Link>
                                    <Link to={`#`}>
                                    <li style={{marginRight:20}}><a>Blog</a></li>
                                    </Link>
                                    <Link to={`#`}>
                                    <li style={{marginRight:20}}><a>Contact</a></li>
                                    </Link>
                                </ul>
                            </nav>

                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="widgets-wrap float-md-right">
                                <div className="widget-header  mr-3">
                                    <a href="#" className="icon icon-sm rounded-circle border"><i
                                        className="fa fa-shopping-cart"></i></a>
                                    <span className="badge badge-pill badge-danger notify">0</span>
                                </div>
                                <div className="widget-header icontext">
                                    <a className="icon icon-sm rounded-circle border"><i
                                        className="fa fa-user"></i></a>
                                    <div className="text">
                                        <span className="text-muted">Welcome!</span>
                                        <div>
                                            <a>Sign in</a> |
                                            <a> Register</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}

import React, {useEffect, useState} from 'react'
import Header from "../../component/header";
import Footer from "../../component/footer";
import CallUnAuthorize from "../../until/callUnAuthorize";
import {toast} from "react-toastify";
import Loader from "../../component/loader";
import {Pagination, Select} from "antd";
import ProductCart from "../../component/Product";
import { Menu } from 'antd';

const { SubMenu } = Menu;
const { Option } = Select;
const ProductList=()=>{
    const [listProduct,setListProduct]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages,setPages]= useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [listCategoryWeb,setListCategoryWeb]=useState([]);
    const [listCategoryMobile,setListCategoryMobile]=useState([]);
    const [idCategory,setIdCategory]=useState('-1');
    const [search,setSearch]=useState('');
    const [filter,setFilter]=useState('-1');
    const [listCourseHighLight, setListCourseHighLight] = useState([]);
    const [listNewCourse, setListNewCourse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resCateWeb = await CallUnAuthorize("GET", null, `/categories/field_id/1`);
            const resCateMobile = await CallUnAuthorize("GET", null, `/categories/field_id/2`);
            const resCourseHighLight = await CallUnAuthorize("GET", null, "/guest-course/most-highlight");
            const resNewCourse = await CallUnAuthorize("GET", null, "/guest-course/new-course");

            console.log(resCateWeb.data)
            if(resCateMobile.status === 1 && resCateWeb.status === 1) {
                setListCategoryWeb(resCateWeb.data)
                setListCategoryMobile(resCateMobile.data);
                setListCourseHighLight(resCourseHighLight.data);
                setListNewCourse(resNewCourse.data);
            }
            else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            let res=null;
            if(idCategory==='-1'&&filter==='-1')
            {
                res = await CallUnAuthorize("GET", null, `/courses?page=${currentPage}&search=${search}`);
            }
            else if(idCategory!=='-1'&&filter==='-1')
            {
                res = await CallUnAuthorize("GET", null, `/courses?page=${currentPage}&category_id=${idCategory}&search=${search}`);
            }else if(idCategory==='-1'&&filter!=='-1')
            {
                if(filter==='1')
                {
                    res = await CallUnAuthorize("GET", null, `/courses?page=${currentPage}&search=${search}&sort_by=rating_average&sort_type=desc`);
                }else if(filter==='2')
                {
                    res = await CallUnAuthorize("GET", null, `/courses?page=${currentPage}&search=${search}&sort_by=promotion_price&sort_type=asc`);
                }
            }
            else if(idCategory!=='-1'&&filter!=='-1')
            {
                if(filter==='1')
                {
                    res = await CallUnAuthorize("GET", null, `/courses?page=${currentPage}&category_id=${idCategory}&search=${search}&sort_by=rating_average&sort_type=desc`);
                }else if(filter==='2')
                {
                    res = await CallUnAuthorize("GET", null, `/courses?page=${currentPage}&category_id=${idCategory}&search=${search}&sort_by=promotion_price&sort_type=asc`);
                }
            }
            if(res.status === 1) {
                setIsLoading(false);
                setListProduct(res.data.courses);
                setPages(res.data.totalPage);
                setIsLoading(false);
            }
            else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [currentPage,pages,idCategory,search,filter])

    const onChangeCurrentPage=(data)=>{
        setCurrentPage(data);
        return data;
    }

    const handleChooseCategories=(value) =>{
        setIdCategory(value.key);
        setSearch('');
        console.log(value)
    }

    const btnsearch=()=>{
        const value= document.getElementById("txtSearch").value;
        setSearch(value);
    }
    const onChangeFilter=(value)=>{
        setFilter(value)
    }
    if(isLoading) return (
        <React.Fragment>
        <Header/>
        <div style={{marginLeft:'200px'}}>
            <Loader/>
        </div>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <Header/>
            <div className="App">
                <section className="section-pagetop bg">
                    <div className="container">
                        <h2 className="title-page">Category courses </h2>
                    </div>
                </section>
                <section className="section-content padding-y">
                    <div className="container">
                        <div className="row">
                            <aside className="col-md-3">
                                <div className="card">
                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" data-toggle="collapse" data-target="#collapse_1"
                                               aria-expanded="true" className="">
                                                <i className="icon-control fa fa-chevron-down"></i>
                                                <h6 className="title">Search Course</h6>
                                            </a>
                                        </header>
                                        <div className="filter-content collapse show" id="collapse_1">
                                            <div className="card-body">
                                                <form className="pb-3">
                                                    <div className="input-group">
                                                        <input id="txtSearch" type="text" className="form-control" placeholder="Search"/>
                                                        <div className="input-group-append">
                                                            <button className="btn btn-light" type="button" onClick={btnsearch}><i
                                                                className="fa fa-search"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" data-toggle="collapse" data-target="#collapse_2"
                                               aria-expanded="true" className="">
                                                <i className="icon-control fa fa-chevron-down"></i>
                                                <h6 className="title">More filter </h6>
                                            </a>
                                        </header>
                                        <div className="filter-content collapse show" id="collapse_2">
                                            <div className="card-body">
                                                <Select
                                                    showSearch
                                                    style={{ width: 200 }}
                                                    placeholder="Filter by..."
                                                    optionFilterProp="children"
                                                    onChange={onChangeFilter}
                                                >
                                                    <Option value='-1'>None</Option>
                                                    <Option value='1'>Rating points decrease</Option>
                                                    <Option value='2'>Prices ascending</Option>
                                                </Select>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </aside>
                            <main className="col-md-9">
                                <header className="border-bottom mb-4 pb-3">
                                    <div className="form-inline">
                                        <Menu onClick={handleChooseCategories} style={{ width: 200,border:'1' }} mode="vertical">
                                            <SubMenu key="sub2" title="Choose field level">
                                                <Menu.Item key="-1">All categories</Menu.Item>
                                                <SubMenu key="subMenuWeb" title="Web programming">
                                                    {
                                                        listCategoryWeb.map((data)=>{
                                                            return(
                                                                <Menu.Item key={data.id}>{data.name}</Menu.Item>
                                                            )
                                                        })
                                                    }
                                                </SubMenu>
                                                <SubMenu key="subMenuMobile" title="Mobile programming">
                                                    {
                                                        listCategoryMobile.map((data)=>{
                                                            return(
                                                                <Menu.Item key={data.id}>{data.name}</Menu.Item>
                                                            )
                                                        })
                                                    }
                                                </SubMenu>
                                            </SubMenu>
                                        </Menu>
                                        <span className="ml-md-auto">Items found </span>
                                    </div>
                                </header>
                                <div className="row">
                                        {
                                            listProduct.length > 0 ?
                                                listProduct.map((data, index) => {
                                                    return (
                                                        <div className="col-md-4" key={index}>
                                                            <ProductCart idCourse={data.course.id}
                                                                         nameCourse={data.course.name}
                                                                         nameTeacher={data.user.fullname}
                                                                         price={data.course.price}
                                                                         promotionPrice={data.course.promotion_price}
                                                                         rating={data.course.rating_average}
                                                                         nameCategory={data.category.name}
                                                                         srcImg={data.course.image}
                                                                         listCourseHighLight={listCourseHighLight}
                                                                         listCourseNew={listNewCourse}
                                                            >
                                                            </ProductCart>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <>
                                                    <div style={{
                                                        textAlign: "center",
                                                        backgroundColor: 'grey',
                                                        width: '100%',
                                                        height: '260px',
                                                        lineHeight: '260px',
                                                        marginBottom:'20px'
                                                    }} className="flex-row justify-content-center">
                                                        <p style={{fontSize: 30, fontWeight: 350,textAlign:"center",marginTop:100}}>There are no recently courses!</p>
                                                    </div>
                                                </>
                                        }

                                </div>
                                <div style={{textAlign:"center"}}>
                                    <Pagination simple onChange={onChangeCurrentPage} total={pages*10}/>
                                </div>

                            </main>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </React.Fragment>

    )
}
export default ProductList;
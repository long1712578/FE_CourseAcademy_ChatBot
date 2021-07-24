import React, {useEffect, useState} from 'react'
import Header from "../../component/header";
import Footer from "../../component/footer";
import CallAPI from "../../until/callAPI";
import {toast} from "react-toastify";
import Loader from "../../component/loader";
import {Pagination, Select} from "antd";
import ProductCart from "../../component/Product";
const { Option } = Select;
const ProductList=()=>{
    const [listProduct,setListProduct]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages,setPages]= useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [listCategory,setListCategory]=useState([]);
    const [idCategory,setIdCategory]=useState('-1');
    const [search,setSearch]=useState('');
    const [filter,setFilter]=useState('-1');
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, `/categories`);
            if(res.status === 1) {
                setListCategory(res.data);
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
                console.log('kh cate kh filter')
                res = await CallAPI("GET", null, `/courses?page=${currentPage}&search=${search}`);
            }
            else if(idCategory!=='-1'&&filter==='-1')
            {
                console.log('có cate kh filter')
                res = await CallAPI("GET", null, `/courses?page=${currentPage}&category_id=${idCategory}&search=${search}`);
            }else if(idCategory==='-1'&&filter!=='-1')
            {
                if(filter==='1')
                {
                    console.log('kh cate có filter rating ')
                    res = await CallAPI("GET", null, `/courses?page=${currentPage}&search=${search}&sort_by=rating_average&sort_type=desc`);
                }else if(filter==='2')
                {
                    console.log('kh cate có filter price ')
                    res = await CallAPI("GET", null, `/courses?page=${currentPage}&search=${search}&sort_by=promotion_price&sort_type=asc`);
                }
            }
            else if(idCategory!=='-1'&&filter!=='-1')
            {
                if(filter==='1')
                {
                    console.log('có cate có filter rating ')
                    res = await CallAPI("GET", null, `/courses?page=${currentPage}&category_id=${idCategory}&search=${search}&sort_by=rating_average&sort_type=desc`);
                }else if(filter==='2')
                {
                    console.log('có cate có filter price ')
                    res = await CallAPI("GET", null, `/courses?page=${currentPage}&category_id=${idCategory}&search=${search}&sort_by=promotion_price&sort_type=asc`);
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

    console.log(listProduct)
    const onChangeCurrentPage=(data)=>{
        setCurrentPage(data);
        return data;
    }
    const sortByRatingDESC=()=>
    {
        console.log('sort')
        const listProductSortRating=listProduct.sort((a,b)=>(a.course.rating_average>b.course.rating_average)?-1:1);
        console.log(listProductSortRating)
        setListProduct(listProductSortRating)
    }
    const onChangeCategories=(value) =>{
        setIdCategory(value);
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
                                        <span className="mr-md-auto">32 Items found </span>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Select a category"
                                            optionFilterProp="children"
                                            onChange={onChangeCategories}
                                            onSearch
                                        >
                                            <Option  value='-1'>All Categories</Option>
                                            {
                                                listCategory.map((data,index)=>{
                                                    return(
                                                        <Option key={index} value={data.id}>{data.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>,
                                        <div className="btn-group">
                                            <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip"
                                               title="List view">
                                                <i className="fa fa-bars"></i></a>
                                            <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip"
                                               title="Grid view">
                                                <i className="fa fa-th"></i></a>
                                        </div>
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
                                    <Pagination  simple onChange={onChangeCurrentPage} total={pages*10} />
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

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
            if(idCategory==='-1')
            {
                res = await CallAPI("GET", null, `/courses?page=${currentPage}&search=${search}`);
            }
            else
            {
                res = await CallAPI("GET", null, `/courses?page=${currentPage}&category_id=${idCategory}&search=${search}`);
            }
            if(res.status === 1) {
                setIsLoading(false);
                setListProduct(res.data.courses);
                setPages(res.data.totalPage);
            }
            else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [currentPage,pages,idCategory,search])

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
        console.log(value);
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
                                                <h6 className="title">Brands </h6>
                                            </a>
                                        </header>
                                        <div className="filter-content collapse show" id="collapse_2">
                                            <div className="card-body">
                                                <label className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input"/>
                                                    <div className="custom-control-label">Mercedes
                                                        <b className="badge badge-pill badge-light float-right">120</b>
                                                    </div>
                                                </label>
                                                <label className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input"/>
                                                    <div className="custom-control-label">Toyota
                                                        <b className="badge badge-pill badge-light float-right">15</b></div>
                                                </label>
                                                <label className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input"/>
                                                    <div className="custom-control-label">Mitsubishi
                                                        <b className="badge badge-pill badge-light float-right">35</b></div>
                                                </label>
                                                <label className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input"/>
                                                    <div className="custom-control-label">Nissan
                                                        <b className="badge badge-pill badge-light float-right">89</b></div>
                                                </label>
                                                <label className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input"/>
                                                    <div className="custom-control-label">Honda
                                                        <b className="badge badge-pill badge-light float-right">30</b></div>
                                                </label>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" data-toggle="collapse" data-target="#collapse_3"
                                               aria-expanded="true" className="">
                                                <i className="icon-control fa fa-chevron-down"></i>
                                                <h6 className="title">Price range </h6>
                                            </a>
                                        </header>
                                        <div className="filter-content collapse show" id="collapse_3">
                                            <div className="card-body">
                                                <input type="range" className="custom-range" min="0" max="100" name=""/>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label>Min</label>
                                                        <input className="form-control" placeholder="$0" type="number"/>
                                                    </div>
                                                    <div className="form-group text-right col-md-6">
                                                        <label>Max</label>
                                                        <input className="form-control" placeholder="$1,0000"
                                                               type="number"/>
                                                    </div>
                                                </div>
                                                <button className="btn btn-block btn-primary" onClick={sortByRatingDESC}>Apply</button>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" data-toggle="collapse" data-target="#collapse_4"
                                               aria-expanded="true" className="">
                                                <i className="icon-control fa fa-chevron-down"></i>
                                                <h6 className="title">Sizes </h6>
                                            </a>
                                        </header>
                                        <div className="filter-content collapse show" id="collapse_4">
                                            <div className="card-body">
                                                <label className="checkbox-btn">
                                                    <input type="checkbox"/>
                                                    <span className="btn btn-light"> XS </span>
                                                </label>
                                                <label className="checkbox-btn">
                                                    <input type="checkbox"/>
                                                    <span className="btn btn-light"> SM </span>
                                                </label>
                                                <label className="checkbox-btn">
                                                    <input type="checkbox"/>
                                                    <span className="btn btn-light"> LG </span>
                                                </label>
                                                <label className="checkbox-btn">
                                                    <input type="checkbox"/>
                                                    <span className="btn btn-light"> XXL </span>
                                                </label>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" data-toggle="collapse" data-target="#collapse_5"
                                               aria-expanded="false" className="">
                                                <i className="icon-control fa fa-chevron-down"></i>
                                                <h6 className="title">More filter </h6>
                                            </a>
                                        </header>
                                        <div className="filter-content collapse in" id="collapse_5">
                                            <div className="card-body">
                                                <label className="custom-control custom-radio">
                                                    <input type="radio" name="myfilter_radio" checked=""
                                                           className="custom-control-input"/>
                                                    <div className="custom-control-label">Any condition</div>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input type="radio" name="myfilter_radio"
                                                           className="custom-control-input"/>
                                                    <div className="custom-control-label">Brand new</div>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input type="radio" name="myfilter_radio"
                                                           className="custom-control-input"/>
                                                    <div className="custom-control-label">Used items</div>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                    <input type="radio" name="myfilter_radio"
                                                           className="custom-control-input"/>
                                                    <div className="custom-control-label">Very old</div>
                                                </label>
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

                                                            >
                                                            </ProductCart>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <>
                                                    <div style={{
                                                        textAlign: "center",
                                                        backgroundColor: '#364d79',
                                                        width: '100%',
                                                        height: '260px',
                                                        lineHeight: '260px',
                                                        marginBottom:'20px'
                                                    }} className="flex-row justify-content-center">
                                                        <p style={{fontSize: 30, fontWeight: 350}}>There are no recently courses!</p>
                                                    </div>
                                                </>
                                        }

                                </div>
                                <div style={{textAlign:"center"}}>
                                    <Pagination  simple onChange={onChangeCurrentPage}  total={pages*10} />
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
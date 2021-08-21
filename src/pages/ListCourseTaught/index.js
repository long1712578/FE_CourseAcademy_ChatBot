import Header from "../../component/header";
import React, {useEffect, useState} from "react";
import Footer from "../../component/footer";
import {Container} from "react-bootstrap";
import CallAPI from "../../until/callAPI";
import Loader from "../../component/loader";
import {Col, Pagination, Row} from "antd";
import CardCourse from "../../component/CardCourse";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";

const ListCourseTaught = () => {
    const [listCourseTaught, setListCourseTaught] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages,setPages]= useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    let decode = null;
    let userId = null;
    const router = useHistory();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        localStorage.removeItem("user");
        router.push("/login");
    } else {
        const accessToken = user.accessToken;
        if (accessToken) {
            decode = jwt_decode(accessToken);
            userId = decode.userId;
        }else{
            localStorage.removeItem("user");
            router.push("/login");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const resList = await CallAPI("GET", null, `/courses?page=${currentPage}&&created_by=${userId}`);
            setIsLoading(false);
            if (resList.status === 1) {
                setListCourseTaught(resList.data.courses)
                setPages(resList.data.totalPage);
            }
        }
        fetchData();
    }, [currentPage])

    if (isLoading) return (
        <>
            <Header/>
            <div style={{marginTop: 200}}>
                <Loader/>
            </div>
        </>
    )
    const onChangeCurrentPage=(data)=>{
        setCurrentPage(data);
        return data;
    }
    return (
        <React.Fragment>
            <Header/>
            <div className="wrapper form-wrapper-general mt-5 mb-4">
                <Container className="form-inner-no-restrict">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h3>List Course</h3>
                            <div className="row justify-content-center mt-1">
                                <div className="resize-content"
                                     style={{textAlign: "center", fontSize: 16, fontWeight: 350}}>
                                    List of courses taught and posted by me
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style={{textAlign:"center"}}>
                        {listCourseTaught.length > 0 ?
                            <>
                                <hr/>
                                <Row xs={1} md={2} lg={3} style={{padding: 10,marginLeft:100}}>
                                    {
                                        listCourseTaught.map((data, index) => {
                                            return (
                                                <Col className="p-1 pb-1" key={index}>
                                                    <CardCourse idCourse={data.course.id}
                                                                nameCourse={data.course.name}
                                                                nameTeacher={data.user.fullname}
                                                                price={data.course.price}
                                                                promotionPrice={data.course.promotion_price}
                                                                rating={data.course.rating_average}
                                                                nameCategory={data.category.name}
                                                                srcImg={data.course.image}
                                                    >
                                                    </CardCourse>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                                <div style={{textAlign:"center"}}>
                                    <Pagination  simple onChange={onChangeCurrentPage} total={pages*10} />
                                </div>
                            </>
                            :
                            <div style={{marginTop: 50, marginBottom: 50, textAlign: "center"}}>
                                <div>
                                    <p style={{fontSize: 20, fontWeight: 400, marginBottom: 0}}>
                                        You are not creating or giving any key learning!
                                    </p>
                                </div>
                            </div>
                        }
                    </div>

                </Container>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
export default ListCourseTaught;
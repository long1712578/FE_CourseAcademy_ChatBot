import React, {useEffect, useState} from "react"
import {Card, Col, Row} from "antd";
import CallUnAuthorize from "../../../until/callUnAuthorize";
import {toast} from "react-toastify";
import Loader from "../../loader";
import {EyeOutlined, StarOutlined} from '@ant-design/icons';

const MostViewComponent = () => {
    const [listNewCourse, setListNewCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallUnAuthorize("GET", null, "/guest-course/new-course");
            if (res.status === 1) {
                setIsLoading(false);
                setListNewCourse(res.data);
            } else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])
    console.log(setListNewCourse.length);
    if (isLoading) return (
        <div style={{marginLeft: '200px'}}>
            <Loader/>
        </div>
    )
    return (
        <React.Fragment>
            <Card title="Top New Course" style={{backgroundColor: '#efefef', marginTop: '50px', marginBottom: '50px'}}>
                {
                    listNewCourse.length > 0 ?
                        listNewCourse.map((data, index) => {
                            return (
                                <Card.Grid bordered={true} style={{width: '50%', border: '1px solid black'}}>
                                    {data.name}
                                    <span style={{float: "right"}}>
                                                      {data.price}$
                                                </span>
                                </Card.Grid>
                            );
                        })
                        :
                        <>
                            <div style={{
                                textAlign: "center",
                                backgroundColor: '#364d79',
                                width: '100%',
                                height: '260px',
                                lineHeight: '260px'
                            }} className="flex-row justify-content-center">
                                <p style={{fontSize: 30, fontWeight: 350}}>There are no view at all course!</p>
                            </div>
                        </>

                }
            </Card>

        </React.Fragment>


    );
}
export default MostViewComponent;
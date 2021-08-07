import React, {useEffect, useState} from "react"
import {Card, Col, Row} from "antd";
import CallAPI from "../../../until/callAPI";
import {toast} from "react-toastify";
import Loader from "../../loader";
import {EyeOutlined, StarOutlined} from '@ant-design/icons';

const MostViewComponent = () => {
    const [listCourseMostView, setListCourseMostView] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, "/guest-course/most-view");
            if (res.status === 1) {
                setIsLoading(false);
                setListCourseMostView(res.data);
            } else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])

    if (isLoading) return (
        <div style={{marginLeft: '200px'}}>
            <Loader/>
        </div>
    )
    return (
        <React.Fragment>
            <Card title="Top View" style={{backgroundColor: '#efefef', marginTop: '50px'}}>
                {
                    listCourseMostView.length > 0 ?
                        listCourseMostView.map((data, index) => {
                            return (
                                <Card.Grid bordered={true} style={{width: '20%', border: '1px solid black'}}>
                                    {data.name}
                                    <span style={{float: "right"}}>
                                                      {data.view}
                                                </span>
                                    <EyeOutlined style={{float: "right", margin: '5px'}}>
                                    </EyeOutlined>
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
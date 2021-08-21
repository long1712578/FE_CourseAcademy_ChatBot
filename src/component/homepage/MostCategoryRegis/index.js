import React, {useEffect, useState} from "react"
import 'antd/dist/antd.css';
import './index.css';
import { Carousel,Card } from 'antd';
import CallUnAuthorize from "../../../until/callUnAuthorize";
import {toast} from "react-toastify";
import Loader from "../../loader";
const contentStyle = {
    height: '140px',
    color: '#fff',
    lineHeight: '140px',
    background: '#364d79',
};
function MostCategoryRegis() {
    const [listCategoryMostRegis, setListCategoryMostRegis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallUnAuthorize("GET", null, "/guest-course/most-regis");
            if (res.status === 1) {
                setIsLoading(false);
                setListCategoryMostRegis(res.data);
            }

            else
                toast.error("Something went wrong. Try later");
        };
        fetchData();
    }, []);
    if (isLoading)
        return (
            <div style={{ marginLeft: '200px' }}>
                <Loader />
            </div>
        );
    return (
        <React.Fragment>
            <h6 style={{ marginLeft: '25px' }}>The list of the most registered categories of the week</h6>
            <Carousel autoplay>
                {listCategoryMostRegis.length > 0 ?
                    listCategoryMostRegis.map((data, index) => {
                        return (
                            <div key={index}>
                                <h3 style={contentStyle}>
                                    <Card title={data.name} style={{
                                        width: '90%',
                                        backgroundColor: '#e5d5c1',
                                        height: '140px',
                                        margin: 'auto',
                                        textAlign: 'center',
                                    }}
                                        loading={isLoading}
                                    >
                                        <div style={{ marginTop: '15px' }}>

                                            <p style={{ float: 'left', color: 'black' }}>
                                                Number of subscribers: {data.tNumber}
                                            </p>
                                        </div>
                                    </Card>
                                </h3>
                            </div>
                        );
                    })
                    :
                    <>
                        <div style={{ textAlign: "center", backgroundColor: '#364d79', width: '100%', height: '260px', lineHeight: '260px' }} className="flex-row justify-content-center">
                            <p style={{ fontSize: 30, fontWeight: 350 }}>There are no recently reviewed courses!</p>
                        </div>
                    </>}
            </Carousel>
        </React.Fragment>
    );
}
export default MostCategoryRegis;
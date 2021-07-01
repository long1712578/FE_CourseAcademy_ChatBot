import React, {useEffect, useState} from "react"
import 'antd/dist/antd.css';
import './index.css';
import { Carousel,Card } from 'antd';
import CallAPI from "../../../until/callAPI";
import {toast} from "react-toastify";
import Loader from "../../loader";
const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '260px',
    background: '#364d79',
};
const MostHighLightComponent=()=>{
    const [listCourseHighLight,setListCourseHighLight]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, "/guest-course/most-highlight");
            if(res.status === 1) {
                setIsLoading(false);
                setListCourseHighLight(res.data);
            }
            else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])
    console.log(listCourseHighLight.length);
    if(isLoading) return (
        <div style={{marginLeft:'700px'}}>
            <Loader/>
        </div>
    )
    return (
        <React.Fragment>
                    <Carousel autoplay>
                        {
                            listCourseHighLight.length > 0 ?
                            listCourseHighLight.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <h3 style={contentStyle}>
                                            <Card title={data.name} style={{
                                                width: '90%',
                                                backgroundColor: '#e5d5c1',
                                                height: '220px',
                                                margin: 'auto',
                                                textAlign: 'center',
                                            }}
                                                  loading={isLoading}
                                            >
                                                <div style={{textAlign: 'left'}}>
                                                    <p>Description: {data.description}</p>
                                                </div>
                                                <div style={{marginTop: '15px'}}>
                                                    <p style={{float: 'left'}}>Rating in
                                                        week: {data.rat_week.split('.0000')}<span
                                                            className="fa fa-star checked"></span></p>
                                                    <p className="card-price">Price: {data.price}$</p>
                                                </div>
                                            </Card>
                                        </h3>
                                    </div>
                                )
                            })
                                :
                                <>
                                    <div style={{textAlign: "center",backgroundColor:'#364d79',width:'100%',height:'260px',lineHeight: '260px'}} className="flex-row justify-content-center" >
                                        <p style={{fontSize: 30, fontWeight: 350}}>There are no recently reviewed courses!</p>
                                    </div>
                                </>
                        }
                    </Carousel>
        </React.Fragment>
    );
};
export default MostHighLightComponent;
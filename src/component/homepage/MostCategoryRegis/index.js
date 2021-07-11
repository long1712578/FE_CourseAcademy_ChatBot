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
    const [listCategoryMostRegis,setListCategoryMostRegis]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, "/guest-course/most-regis");
            if(res.status === 1) {
                setIsLoading(false);
                setListCategoryMostRegis(res.data);
            }
            else
                toast.error("Something went wrong. Try later")
        }
        fetchData();
    }, [])
    if(isLoading) return (
        <div style={{marginLeft:'200px'}}>
            <Loader/>
        </div>
    )
    return (
        <React.Fragment>
            <Carousel autoplay>
                {
                    listCategoryMostRegis.length > 0 ?
                        listCategoryMostRegis.map((data, index) => {
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
                                            <div style={{marginTop: '15px'}}>
                                                <p style={{float: 'left'}}>
                                                    Number of subscribers : {data.tNumber}
                                                        </p>
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
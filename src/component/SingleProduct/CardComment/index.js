import React, {useState,  useEffect} from "react";
import CallAPI from "../../../until/callAPI";

const CardComment=({courseId})=>{
    const [listFeedback, setListFeedback] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await CallAPI("GET", null, `/comments/course/${courseId}`);
            console.log('cmd', res);
            if(res.status === 1) {
                setListFeedback(res.data.cmd);
            }
            else{
                setListFeedback([]);
            }
        }
        fetchData();
      }, []);
      console.log('list fb', listFeedback);
    
    return(<article className="card mt-5">
        <div className="container mt-5">
            <div className="row d-flex justify-content-center mb-4">
                <div className="col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <div className="buttons"> <span
                            className="badge bg-white d-flex flex-row align-items-center"> <span
                            className="text-primary">Comments "ON"</span>
                                        </span>
                        </div>
                    </div>
                    {
                        listFeedback.length>0?
                            listFeedback.map((data,index)=>{
                                return(
                                    <div className="card p-3" key={index}>
                                        <div className="card header">
                                            {data.user.fullname}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span style={{marginLeft:18}}> {data.rating.comment}</span>
                                            <div className="user d-flex flex-row align-items-center"></div>
                                            <small>2 days ago</small>
                                        </div>
                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                            <div className="reply px-4"><small>Remove</small> </div>
                                            <div className="icons align-items-center"><i
                                                className="fa fa-star text-warning"></i> <i
                                                className="fa fa-check-circle-o check-icon"></i></div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>
                                <h6 style={{textAlign:"center"}}>No comment</h6>
                            </>
                    }
                </div>
            </div>
        </div>
    </article>)
}
export default CardComment;
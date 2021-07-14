import {Card, Carousel} from "antd";
import React from "react";

const CardSameCourse=({mostBuySameCategory})=>{
    return(
        <article className="card mt-5">
        <div style={{marginTop:20,marginBottom:20,marginLeft:15}}>
            <h6>The most purchased other courses in the same category</h6>
        </div>
        <Carousel autoplay>
            {
                mostBuySameCategory.length > 0 ?
                    mostBuySameCategory.map((data, index) => {
                        return (
                            <div key={index}>
                                <h3>
                                    <Card title={data.name} style={{
                                        width: '100%',
                                        backgroundColor: '#e5d5c1',
                                        height: '220px',
                                        margin: 'auto',
                                        textAlign: 'center',
                                    }}
                                    >
                                        <div style={{textAlign: 'left'}}>
                                            <p>Description: {data.description}</p>
                                        </div>
                                        <div style={{marginTop: '15px'}}>
                                            <p style={{float: 'left'}}>Rating: {data.rating_average}<span
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
                        <h6 style={{textAlign:"center"}}>No course</h6>
                    </>
            }
        </Carousel>
    </article>)
}
export default CardSameCourse;
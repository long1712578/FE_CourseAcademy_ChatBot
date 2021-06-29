import React from "react"
import MostHighLightComponent from '../../component/homepage/mostHighLightComponent'
const HomePage = () =>
{
    // if(localStorage.getItem("user"))
    //     return (<Redirect to="/dashboard" />)

    return(
        <div>
            <React.Fragment>
                {/*<Header/>*/}
                <MostHighLightComponent/>
                {/*<Footer/>*/}
            </React.Fragment>
        </div>
    )
}

export default HomePage
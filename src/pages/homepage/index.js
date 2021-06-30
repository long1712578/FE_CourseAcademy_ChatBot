import React from "react"
import MostHighLightComponent from '../../component/homepage/MostHighLightComponent'
import MostViewComponent from "../../component/homepage/MostViewComponent";
const HomePage = () =>
{
    // if(localStorage.getItem("user"))
    //     return (<Redirect to="/dashboard" />)

    return(
        <div>
            <React.Fragment>
                {/*<Header/>*/}
                <MostHighLightComponent/>
                <MostViewComponent/>
                {/*<Footer/>*/}
            </React.Fragment>
        </div>
    )
}

export default HomePage
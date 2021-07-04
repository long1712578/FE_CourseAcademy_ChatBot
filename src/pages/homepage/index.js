import React from "react"
import MostHighLightComponent from '../../component/homepage/MostHighLightComponent'
import MostViewComponent from "../../component/homepage/MostViewComponent";
import NewCourse from "../../component/homepage/NewCourse";
import MostCategoryRegis from "../../component/homepage/MostCategoryRegis";
import Header from "../../component/header";

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
                <NewCourse/>
                <MostCategoryRegis/>
                {/*<Footer/>*/}
            </React.Fragment>
        </div>
    )
}

export default HomePage
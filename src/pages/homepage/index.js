import React from 'react'
import MostHighLightComponent from "../../component/homepage/mostHighLightComponent";
import MostViewComponent from "../../component/homepage/MostViewComponent";
import NewCourse from "../../component/homepage/NewCourse";
import MostCategoryRegis from "../../component/homepage/MostCategoryRegis";
import Header from "../../component/header";
import Footer from '../../component/footer';

const HomePage = () =>
{
    return(
        <div>
            <React.Fragment>
                <Header/>
                <MostHighLightComponent/>
                <MostViewComponent/>
                <NewCourse/>
                <MostCategoryRegis/>
                <Footer/>
            </React.Fragment>
        </div>
    )
}

export default HomePage
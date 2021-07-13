import axios from "axios"
import * as hostConstant from "./constant";
const URL_API = hostConstant.API_LINK;

const CallUnAuthorize = async (method, body, pathURL) =>
{
    try{
        const response = await axios({
            method: method,
            url: URL_API + pathURL,
            data: body,
        });

        if(response.status === 200)
            return {status: 1, data: response.data};
    } catch(err)
    {
        if(err.response)
        {
            if(err.response.status === 400)
                return {status: 0, err: err.response.data}
        }
    }
    return {status: 0, err: "Something went wrong. Try later!"}
}

export default CallUnAuthorize
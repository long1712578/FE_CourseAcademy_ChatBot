import axios from "axios"
import CallUnAuthorize from "./callUnAuthorize";
import * as hostConstant from "./constant";

const URL_API = hostConstant.API_LINK;

const CallAPI = async (method, body, pathURL) =>
{
    const user = await JSON.parse(localStorage.getItem('user'));
    const token = user ? user.accessToken : null;
    if(!token) return {status: -1, err: "UnAuthorization"}

    try{
        const response = await axios({
            method: method,
            url: URL_API + pathURL,
            data: body,
            headers: {"Authorization": `${token ? token : null}`}
        });
        if(response.status === 200 || response.status === 201)
            return {status: 1, data: response.data};
    } catch(err)
    {
        if(err.response)
        {
            console.log(err.response)
            if(err.response.status === 400)
                return {status: 0, err: err.response.data}
            if(err.response.status === 401){
                const refresh = user ? user.refreshToken : null;
                const reFetchToken = await CallUnAuthorize("POST", {accessToken: token, refreshToken: refresh}, "/sign-in/refesh");
                if(reFetchToken.status === 1)
                {
                    await localStorage.removeItem("user");
                    console.log("acess", reFetchToken.data.accessToken);
                    const data = {
                        accessToken: reFetchToken.data.accessToken,
                        refreshToken: refresh
                    }
                    await localStorage.setItem("user", JSON.stringify(data));
                    try{
                        const response = await axios({
                            method: method,
                            url: URL_API + pathURL,
                            data: body,
                            headers: {"Authorization": JSON.stringify(`${reFetchToken.data.accessToken}`)}
                        });
                        if(response.status === 200 || response.status === 201)
                        {
                            return {status: 1, data: response.data};

                        }
                    } catch(err)
                    {
                        return {status: 0, err: "Something went wrong. Try later!"}
                    }
                }
                else
                {
                    return {status: -1, err: "UnAuthorization"}
                }
            }
        }
    }

    return {status: 0, err: "Something went wrong. Try later!"}
}

export default CallAPI;

import axios from "axios";

// import { setLogStyle } from './log-config'
import { BASE_URL } from '../../src/Constant/Url';


export default async (endPoint, data = null, method = "get", headers = {}) => {
    // const token = GlobalStore.token;

    // if (token) {
    //     headers = {
    //         // ...headers,
    //         token,
    //     };
    // }
    let objForSubmitAxios = {
        url: BASE_URL + endPoint,
        method,
        headers,
    };
    if (data && method.toLocaleLowerCase() != 'get') {
        objForSubmitAxios = {
            ...objForSubmitAxios, data
        }
    }
    
    return axios(objForSubmitAxios)
        .then((response) => {
            if (response) {
                // console.log(response);
                if(!response.data.error){
                    return response.data
                }
                // const { status, data: d } = response;
                // const { error, message, ...data } = d;
                // console.log({ error, message, data })
                // if (!error) {
                //     console.log('----FETCHING SUCCESS: ', response);
                //     console.log({ data })
                //     return data;
                // }

                // return { err: true, error: true, message: message };
            }
        })
        .catch((error) => {
            throw error
        });
};

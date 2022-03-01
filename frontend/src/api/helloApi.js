import axiosClient from "./axiosClient";
class HelloApi {
    getAll = (params) => {
    const url = '/hello';
    return axiosClient.get(url, { params });
    };
    }
    const helloApi = new HelloApi();
    export default helloApi;
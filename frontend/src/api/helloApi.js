import axiosClient from "./axiosClient";
class HelloApi {
    // getAll = (params) => {
    // const url = '/hello';
    // return axiosClient.get(url, { params });
    getAll = () => {
        const url = '/hello';
        return axiosClient.get(url, {  });
    };
    }
    const helloApi = new HelloApi();
export default helloApi;
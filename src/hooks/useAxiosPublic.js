import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://uni-drive-client.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
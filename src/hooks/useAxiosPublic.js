import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://neo-drive-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
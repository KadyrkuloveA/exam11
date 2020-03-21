import axios from 'axios';
import {apiURL} from "./constants";

const axiosSeller = axios.create({
    baseURL: apiURL
});

export default axiosSeller;
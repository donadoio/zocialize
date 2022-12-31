import axios from "axios";
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const axiosInstanceGenerator = (baseURL: string, accessToken: string, refreshToken) => {
    let axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    axiosInstance.interceptors.request.use(async req => {
        const user: any = jwt_decode(accessToken);
        const isExpired: boolean = dayjs.unix(user.exp).diff(dayjs()) < 1;
        console.log(user);
        console.log("isExpired: ", isExpired);
        if (!isExpired) {
            return req;
        } else {
            const response = await axios.post(`${baseURL}/auth/refresh`, null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            console.log(response.data);
            return req;
        }
    });

    return (axiosInstance);
}

export default axiosInstanceGenerator;
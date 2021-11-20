import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://futebolada-backend.herokuapp.com/api/v2';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

interface ILoginBody {
    username: string;
    password: string;
}

export const login = async (body: ILoginBody) => {
    const response: AxiosResponse<{
        accessToken: string,
        username: string
    }> = await API.post(`/admin/login`, body);
    return response;
}

export default API;
import axios from "axios";
import type {ILoginResponse} from "./model";

const BASE_URL: string = 'http://localhost:3000/api/'
const TIMEOUT: number = 5000;

const response_body = (response) => response.data;

export const Users = {
    login: (username: string, password: string): Promise<ILoginResponse> => {
        let data = JSON.stringify({
            "username": username,
            "password": password
        });
        return axios
            .create({
                baseURL: BASE_URL,
                timeout: TIMEOUT,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                },
            })
            .post("/v1/login", data)
            .then(response_body);
    }
}

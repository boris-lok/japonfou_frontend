import axios from "axios";
import type {
    ICreateCustomerRequest,
    ICustomer,
    IFilterCustomerListRequest,
    ILoginResponse,
    ListResponse
} from "./model";
import {user} from "../stores/user";


const BASE_URL: string = 'http://localhost:3000/api/'
const TIMEOUT: number = 5000;

let token = (function () {
    let result: string | null = null;
    return function () {
        if (result === null) {
            result = JSON.parse(user.get()).token;
        }
        return result;
    }
})();

const encode_keyword = (keyword: string): string => {
    return btoa(keyword);
}

const response_body = (response) => response.data;

let auth_axios = (function () {
    let client = null;
    return function () {
        if (client === null) {
            client = axios.create({
                baseURL: BASE_URL,
                timeout: TIMEOUT,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
        }
        return client
    }
})();


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

export const Customers = {
    get_customers: (keyword: IFilterCustomerListRequest | null = null, page: number | null = null, page_size: number | null = null): Promise<ListResponse<ICustomer>> => {
        let k = null;
        if (keyword !== null) {
            k = encode_keyword(JSON.stringify(keyword));
        }
        let data = {
            ...(page !== null) && {page: page},
            ...(page_size !== null) && {page_size: page_size},
            ...(k !== null) && {keyword: k},
        }

        return auth_axios()
            .get("/v1/admin/customers", {
                params: data
            })
            .then(response_body)

    },
    create_customer: (new_customer: ICreateCustomerRequest): Promise<any> => {
        let data = JSON.stringify(new_customer);
        return auth_axios()
            .post("/v1/admin/customers", data)
            .then(response_body);
    }
}

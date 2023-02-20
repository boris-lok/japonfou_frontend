export interface ICustomer {
    id: number,
    name: string,
    email?: string,
    phone?: string,
    remark?: string,
    created_at: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export interface IFilterCustomerListRequest {
    id?: number,
    name?: string,
    email?: string,
    phone?: string,
}

export interface ICreateCustomerRequest {
    name: string,
    email?: string,
    phone?: string,
    remark?: string
}


export interface ILoginResponse {
    token: string,
}
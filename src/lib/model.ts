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


export interface ILoginResponse {
    token: string,
}
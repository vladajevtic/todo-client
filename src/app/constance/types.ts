import { SafeResourceUrl } from "@angular/platform-browser";

export interface IRegisterUserReq {
    name: string;
    email: string;
    password: string;
    age: number;
}
export interface IUser{
    name: string;
    age: number;
    email:string;
    '__v': string;
    '_id': string;
    avatar?: SafeResourceUrl | string;
}

export interface IRegisterUserRes{
    user: IUser;
    token: string;
}

export interface ILoginUserReq{
    email: string;
    password: string;
}

export interface IPatchUser{
    name?: string;
    email?: string;
    password?: string
}

export interface ITodo{
    _id: string;
    name: string;
    description: string;
    completed: boolean;
    owner: string
}

export interface ICreateTodo{
    name: string;
    description: string;
}
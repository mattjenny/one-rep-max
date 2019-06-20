export interface IAuthInfo {
    email: string;
    password: string;
}

export interface ISessionCookie extends IAuthInfo {
    userId: number;
}

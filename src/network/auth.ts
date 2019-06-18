import { IAuthInfo } from './types';

const COOKIE_NAME = "fitbod_app_cookie"
const ONE_DAY_MS = 24*60*60*1000;

export function getBasicAuthString(authInfo: IAuthInfo): string {
    return btoa(`${authInfo.username}:${authInfo.password}`);
}

export function getAuthDetails(): IAuthInfo | void {
    const cookieParts = document.cookie.split(';');
    const cookie = cookieParts.find((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`))
    if (cookie) {
        const value = JSON.parse(cookie.split('=')[1]) as IAuthInfo;
        if (value) {
            return value;
        }
    }
    // redirect
    window.location.href = '/login';
    return undefined;
}

export function setAuthDetails(authInfo: IAuthInfo) {
    const expires = new Date();
    expires.setTime(expires.getTime() + ONE_DAY_MS);
    document.cookie = `${COOKIE_NAME}=${JSON.stringify(authInfo)}; expires=${expires}; path=/`;
}

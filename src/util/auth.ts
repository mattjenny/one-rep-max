import { IAuthInfo } from './types';

const COOKIE_NAME = "fitbod_app_cookie"
const MS_IN_HOUR = 60*60*1000;

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
    expires.setTime(expires.getTime() + MS_IN_HOUR);
    document.cookie = `${COOKIE_NAME}=${JSON.stringify(authInfo)}; expires=${expires}; path=/`;
}

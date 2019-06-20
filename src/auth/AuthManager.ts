import { IAuthInfo } from './types';

const COOKIE_NAME = "fitbod_app_cookie"
const ONE_DAY_MS = 24*60*60*1000;

class AuthManagerSingleton {
    public getBasicAuthString(authInfo: IAuthInfo): string {
        return btoa(`${authInfo.username}:${authInfo.password}`);
    }
    
    public isAuthenticated(): boolean {
        const cookie = this.getAuthCookie();
        return !!cookie && !!cookie.username;
    }
    
    public getAuthDetails(): IAuthInfo | void {
        const cookie = this.getAuthCookie();
        if (cookie) {
            return cookie;
        }
    
        // redirect if not currently authed
        window.location.href = '/login';
    }
    
    public setAuthDetails(authInfo: IAuthInfo) {
        const expires = new Date();
        expires.setTime(expires.getTime() + ONE_DAY_MS);
        document.cookie = `${COOKIE_NAME}=${JSON.stringify(authInfo)}; expires=${expires}; path=/`;
    }

    public logout() {
        document.cookie = `${COOKIE_NAME}={}`;
    }
    
    private getAuthCookie(): IAuthInfo | void {
        const cookieParts = document.cookie.split(';');
        const cookie = cookieParts.find((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`))
        if (cookie) {
            const value = JSON.parse(cookie.split('=')[1]) as IAuthInfo;
            if (value) {
                return value;
            }
        }
        return undefined;
    }
}

export const AuthManager = new AuthManagerSingleton();

import { IAuthInfo, ISessionCookie } from './types';

const COOKIE_NAME = "fitbod_app_cookie"
const ONE_DAY_MS = 24*60*60*1000;

class AuthManagerSingleton {
    public getBasicAuthString(authInfo: IAuthInfo): string {
        return btoa(`${authInfo.email}:${authInfo.password}`);
    }
    
    public isAuthenticated(): boolean {
        const cookie = this.getSessionCookie();
        return !!cookie && !!cookie.email;
    }
    
    public getAuthDetails(): IAuthInfo | void {
        const cookie = this.getSessionCookie();
        if (cookie) {
            return {
                email: cookie.email,
                password: cookie.password,
            };
        }
    
        // redirect if not currently authed
        window.location.href = '/login';
    }

    public getLoggedInUserId(): number | void {
        const cookie = this.getSessionCookie();
        if (cookie) {
            return cookie.userId;
        }

        return undefined;
    }
    
    public setSessionCookie(sessionCookie: ISessionCookie) {
        const expires = new Date();
        expires.setTime(expires.getTime() + ONE_DAY_MS);
        document.cookie = `${COOKIE_NAME}=${JSON.stringify(sessionCookie)}; expires=${expires}; path=/`;
    }

    public logout() {
        document.cookie = `${COOKIE_NAME}={}`;
    }
    
    private getSessionCookie(): ISessionCookie | void {
        const cookieParts = document.cookie.split(';');
        const cookie = cookieParts.find((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`))
        if (cookie) {
            const value = JSON.parse(cookie.split('=')[1]) as ISessionCookie;
            if (value) {
                return value;
            }
        }
        return undefined;
    }
}

export const AuthManager = new AuthManagerSingleton();

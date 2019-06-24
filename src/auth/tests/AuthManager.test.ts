import { AuthManager } from '../AuthManager';

const email = 'foo';
const password = 'bar';
const userId = 1;

describe('AuthManager tests', () => {
    beforeEach(() => {
        AuthManager.setSessionCookie({ email, password, userId });
    })

    it('getBasicAuthString generates basic auth base64 string', () => {
        expect(AuthManager.getBasicAuthString({ email, password })).toEqual('Zm9vOmJhcg==');
    })

    it('clears and sets session cookie', () => {
        AuthManager.logout();
        expect(document.cookie).toEqual('fitbod_app_cookie={}');
        expect(AuthManager.isAuthenticated()).toEqual(false);
        AuthManager.setSessionCookie({ email, password, userId });
        expect(document.cookie).toEqual('fitbod_app_cookie={\"email\":\"foo\",\"password\":\"bar\",\"userId\":1}');
        expect(AuthManager.isAuthenticated()).toEqual(true);
    })

    it('gets auth details from cookie', () => {
        expect(AuthManager.getAuthDetails()).toEqual({ email, password });
    })

    it('gets logged in user id from cookie', () => {
        expect(AuthManager.getLoggedInUserId()).toEqual(1);
    })
})

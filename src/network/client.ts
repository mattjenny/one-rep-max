import { devBaseUrl, prodBaseUrl } from './constants';
import { fetchJson, fetchJsonWithAuthInfo } from './fetch';
import { IAuthInfo } from './types';

export function loadUsersWithAuthInfo(authInfo: IAuthInfo) {
    return fetchJsonWithAuthInfo(`${getBaseUrl()}/api/v1/users`, 'GET', {}, authInfo);
}

export function loadUsers() {
    return fetchJson(`${getBaseUrl()}/api/v1/users`, 'GET');
}

export function loadUser(userId: string) {
    return fetchJson(`${getBaseUrl()}/api/v1/users/${userId}`, 'GET');
}

function getBaseUrl() {
    if (process.env.NODE_ENV === 'production') {
        return prodBaseUrl;
    }
    return devBaseUrl;
}

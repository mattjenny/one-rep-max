import { devBaseUrl, prodBaseUrl } from './constants';
import { fetchJson } from './fetch';

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

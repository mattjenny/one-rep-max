import { getAuthDetails } from './auth';
import { IAuthInfo } from './types';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function fetchJson(url: string, method: HTTPMethod, data: Object = {}): Promise<any> {
    const authInfo = getAuthDetails();
    if (!authInfo) {
        return Promise.reject(new Error('Auth details not found!'));
    }

    return fetchJsonWithAuthInfo(url, method, data, authInfo);
}

export function fetchJsonWithAuthInfo(url: string, method: HTTPMethod, data: Object = {}, authInfo: IAuthInfo): Promise<any> {
    const { username, password } = authInfo;

    console.log('fetch body: ', {
        method,
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: method === 'GET' ? undefined : JSON.stringify(data),
    });

    return fetch(url, {
        method,
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Basic ${btoa(`${username}:${password}`)}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        // body: method === 'GET' ? undefined : JSON.stringify(data),
    })
    .then(response => {
        try {
            return response.json()
        } catch {
            return response
        }
    });
}

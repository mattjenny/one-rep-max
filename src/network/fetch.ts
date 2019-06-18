import { getAuthDetails, getBasicAuthString } from './auth';
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
    return fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getBasicAuthString(authInfo)}`,
            'Accept': 'application/json',
        },
        body: method === 'GET' ? undefined : JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            console.error('Error fetching; status code = ', response.status);
            throw new Error(`Fetch error: status ${response.status}`)
        }
    });
}

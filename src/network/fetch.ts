import { AuthManager } from '../auth/AuthManager';
import { IAuthInfo } from '../auth/types';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const MAX_RETRIES = 3;

export function fetchJson(url: string, method: HTTPMethod, data: Object = {}, tries = 1): Promise<any> {
    const authInfo = AuthManager.getAuthDetails();
    if (!authInfo) {
        return Promise.reject(new Error('Auth details not found!'));
    }

    return fetchJsonWithAuthInfo(url, method, data, authInfo)
        .catch((e) => {
            if (tries < MAX_RETRIES) {
                console.warn(`Error; retrying. Attempt number: ${tries + 1}`, e);
                return fetchJson(url, method, data, tries + 1);
            }
            throw e;
        });
}

export function fetchJsonWithAuthInfo(url: string, method: HTTPMethod, data: Object = {}, authInfo: IAuthInfo): Promise<any> {
    return fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${AuthManager.getBasicAuthString(authInfo)}`,
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

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function fetchJson(url: string, method: HTTPMethod, data: Object = {}): Promise<any> {
    return fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: method === 'GET' ? undefined : JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            console.error('Error fetching; status code = ', response.status);
        }
    });
}

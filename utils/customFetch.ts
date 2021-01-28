import fetchFromUnfetch from 'isomorphic-unfetch'

export const FILE_FIELD = "FILE"

export default async function customFetch(
    requestUrl: string,
    method: string,
    data: object | undefined = undefined,
    isFile: boolean = false
    ) {

    // Check if localStorage exists
    let localStorageExists = false;
    try {
        localStorageExists = (localStorage !== undefined);
    } catch(err) {
        console.log(`localStorage not exists at request ${requestUrl}.\n May you're using Opera or you are over server side.`)
    }

    let headers = {}

    // Si es una URL privada, pone el token en los headers
    if (localStorageExists && requestUrl.includes('private')) {
        headers['token'] = JSON.parse(localStorage.getItem('token'))
    }

    let body = undefined;

    if (isFile) {
        let formData = new FormData();
        formData.append(FILE_FIELD, data[FILE_FIELD][0] );
        body = formData;
    } else {
        if (method === 'POST') {
            body = JSON.stringify(data)
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    let res = await fetchFromUnfetch(requestUrl, { method, headers, body })
    
    try {
        let json = await res.json();

        if (!res.ok)
            throw json;
        
            return json
    } catch(err) {
        console.log('Invalid json response parse, res: ', res)
        throw err;
    }
}
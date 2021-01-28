// This module is used to get info from the backend

import Axios, { AxiosResponse } from 'axios'

const DOMAIN = 'http://agusavior.ddns.net'
const PORT = '2200'

//const DOMAIN = 'http://localhost'
//const PORT = '8080'

export const SOURCE_URL = `${DOMAIN}:${PORT}/`;

export default function (urlend: string, thenCallback: (res: AxiosResponse<any>) => void) {
    const url = `${DOMAIN}:${PORT}/${urlend}`
    Axios({
        method: "GET",
        url: url,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        thenCallback(res)
    }).catch(err => {
        console.log('Error at ' + url + ': ' + err)
    });
}
import axios, { AxiosRequestConfig } from 'axios'
import { FILE_FIELD } from './customFetch'


function token() {
    // Check if localStorage exists
    let localStorageExists = false;

    try {
        localStorageExists = (localStorage !== undefined);
    } catch(err) {
        console.log(`Warning! localStorage not exists.\n May you're using Opera or you are over server side.`)
    }

    let headers = {}

    if (localStorageExists) {
        headers['token'] = JSON.parse(localStorage.getItem('token'))
    }

    return headers;
}

function multipart() {
    return {
        'Content-Type': 'multipart/form-data'
    }
}

function tokenAndMultipart() {
    return { ...multipart(), ...token() }
}

export async function get(url: string) {
    let config: AxiosRequestConfig = {
        headers: token()
    }

    try {
        let res = await axios.get(url, config)
        return res.data
    } catch(err) {
        if (err.response)
            throw new Error(err.response.data.message);
        else
            throw err;
    }
}

export async function post(url: string, data?: any) {
    let config: AxiosRequestConfig = {
        headers: token()
    }

    try {
        let res = await axios.post(url, data, config)
        return res.data
    } catch(err) {
        if (err.response)
            throw new Error(err.response.data.message);
        else
            throw err;
    }
}

export async function postFile(url: string, file: File) {
    var formData = new FormData();
    formData.append(FILE_FIELD, file);

    let config: AxiosRequestConfig = {
        headers: tokenAndMultipart()
    }

    try {
        let res = await axios.post(url, formData, config)
        return res.data
    } catch(err) {
        if (err.response)
            throw new Error(err.response.data.message);
        else
            throw err;
    }
}
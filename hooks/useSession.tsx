import { useState, useEffect, } from "react";
import Router from "next/router";
import customFetch from '../utils/customFetch'
import useLocalStorage from "./useLocalStorage";
import User from "../interfaces/user";
import { post } from '../utils/customAxios'

export default function useSession() {
    const [getUserFromStorage, setUserToStorage] = useLocalStorage('user')
    const [getTokenFromStorage, setTokenToStorage] = useLocalStorage('token')
    const [user, setUser] = useState<User | null>(null)

    async function logIn(data: any) {
        const { token, user } = await post('/api/login', data);
        setTokenToStorage(token)
        setUser(user)
        setUserToStorage(user)
        Router.push('/')
    }

    function logOut() {
        setTokenToStorage('')
        setUser(null)
        setUserToStorage(null)
        Router.push('/')
    }

    useEffect(() => {
        setUser(getUserFromStorage())
    }, [])

    return { user, logIn, logOut }
}
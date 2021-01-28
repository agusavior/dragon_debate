import { useState } from "react";
import { SHA256 } from 'sha2'
import {} from '../constants'

export default function useProofOfWork() {
    const [isHashing, setIsHashing] = useState(false)

    function hashThis(username) {

        setIsHashing(true)
        let hash = 'xxxxxxxxxxx'
        let noice = 0;
        while (!hash.startsWith('0000')) {
            hash = SHA256(username + noice.toString()).toString("hex");
            //console.log('hash', hash)
            noice++;
        }
        setIsHashing(false)

        return hash
    }

    return { isHashing, hashThis }
}
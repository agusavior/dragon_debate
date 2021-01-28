import { NextApiResponse } from "next";

export default function error(res: NextApiResponse, message: string) {
    return res.status(400).json({ message })
}
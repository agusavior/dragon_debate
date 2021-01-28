import { createServer } from 'http'
import { NEXT_SERVER_PORT } from '../constants'
import next from 'next'
import { parse } from 'url'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer((req, res) => {
        // You can fill this function with code, see this: https://nextjs.org/docs/advanced-features/custom-server
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(NEXT_SERVER_PORT, () => {
        console.log(`> Ready Next Server on http://localhost:${NEXT_SERVER_PORT}`)
    })
  })
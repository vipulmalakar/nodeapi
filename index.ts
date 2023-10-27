import express, { Request, Response } from 'express'
import AuthRouter from './auth/auth'
import mongodb from './db/mongodb'


const app = express()
const port = 3000



mongodb()

app.use(express.json())

app.use('/auth', AuthRouter)


app.get('/', (_: Request, res: Response) => {

  return res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
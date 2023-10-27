import express, { Request, Response } from 'express'
import AuthRouter from './auth/auth'
import mongodb from './db/mongodb'
import { User } from './auth/schema'


const app = express()
const port = 3000



mongodb()

app.use(express.json())

app.use('/auth', AuthRouter)


app.get('/', (req: Request, res: Response) => {

  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import express, { Request, Response } from 'express'
import AuthRouter from './src/auth/auth'
import mongodb from './src/db/mongodb'


const app = express()
const port = 3000

mongodb()

app.use(express.json())

app.use('/auth', AuthRouter)


app.get('/', (_: Request, res: Response) => {
  return res.send('Hello  new World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

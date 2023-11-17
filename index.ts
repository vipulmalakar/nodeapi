import express, { NextFunction, Request, Response } from 'express'
import AuthRouter from './src/auth/auth'
import mongodb from './src/db/mongodb'
import { ApiError, HttpStatusCode } from './src/core/error'

const app = express()
const port = 3000

mongodb()

app.use(express.json())

app.use('/auth', AuthRouter)


app.get('/', (_: Request, res: Response) => {
  return res.send('Hello  new World!')
})

app.use((error: Error, _: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.httpStatusCode).json({ message: error.message })
  }
  return res.status(HttpStatusCode.INTERNAL_ERROR).json({ message: "Internal server error" })

})

process.on('exit', (code) => {
  console.log(`Node.js process is about to exit with code: ${code}`);
  // Perform cleanup tasks or save data here
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

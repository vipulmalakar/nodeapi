import express from 'express'

import AuthRouter from './auth/auth.js'

const app = express()
const port = 3000


app.use(express.json())


app.use('/auth',AuthRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import { NextFunction, Request, Response, Router } from 'express'
import { User, UserModel } from './schema.js';

declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}

const validateReq = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']
  const user = await UserModel.findOne({ token: token }).lean()
  if (!user) {
    return res.status(401).send({ message: "unathorized" })
  }
  req.user = user
  next();
}

const router = Router();


router.post('/register', async (req: Request, res: Response) => {
  try {
    const usename = req.body.usename;
    const password = req.body.password;
    const email = req.body.email;
    const newUser = new UserModel({ password, usename, email })
    const save = await newUser.save();
    return res.status(201).send({ save })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
})

router.post('/login', async (req: Request, res: Response,) => {
  const usename = req.body.usename;
  const password = req.body.password;
  try {
    const token = await UserModel.validateUser(usename, password);
    return res.send({ token })
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
})

router.get('/info', validateReq, (req: Request, res: Response,) => {
  console.log(req.user);
  return res.send({ message: req.user })
})

router.get('/getEmail', validateReq, (req: Request, res: Response,) => {
  return res.send({ message: req.user.email })
})



export default router
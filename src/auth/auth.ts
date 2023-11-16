import { NextFunction, Request, Response, Router } from 'express'
import { User, UserModel } from './schema';
import { redis } from '../db/redis'

declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}

const rateLimiter = (method: string) => async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const key = `${ip}:${method}`
  const limit = parseInt(await redis.get(key) ?? '0')
  if (limit >= 10) {
    return res.status(429).send({ message: "limit exceed" })
  }
  await redis.set(key, limit + 1, 'EX', 60)
  return next();
}

const validateReq = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers['authorization'] ?? ''

  const haveCacheUser = await redis.get(token)
  if (haveCacheUser) {
    req.user = JSON.parse(haveCacheUser)
    return next();
  }

  const user = await UserModel.findOne({ token: token }).lean()
  if (!user) {
    return res.status(401).send({ message: "unathorized" })
  }

  await redis.set(token, JSON.stringify(user), 'EX', 10)

  req.user = user;
  return next();
}

const router = Router();


router.get('/', async (_: Request, res: Response,) => {
  return res.status(200).send({ message: "hello from auth" })
})
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

router.get('/info', rateLimiter('info'), validateReq, (req: Request, res: Response,) => {
  console.log(req.user);
  return res.send({ message: req.user })
})

router.get('/getEmail', rateLimiter('getEmail'), validateReq, (req: Request, res: Response,) => {
  return res.send({ message: req.user.email })
})



export default router
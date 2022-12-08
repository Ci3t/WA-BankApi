import {Router} from 'express';
import { usersRouter } from './users.router.js';
export const indexRouter = Router()

indexRouter.use('/users',usersRouter)

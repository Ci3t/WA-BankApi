import {Router} from 'express';
import { getUsers,getUser,postUser,patchUser,transferUser,depositUser,updateCreditUser } from '../controller/users.js';
export const usersRouter = Router()


usersRouter.get('/',getUsers);
usersRouter.get('/:id',getUser);
usersRouter.post('/',postUser);
usersRouter.patch('/:id',patchUser);
usersRouter.patch('/:id/deposit',depositUser);
usersRouter.patch('/:id/update',updateCreditUser);
usersRouter.patch('/:from/trans/:to',transferUser);
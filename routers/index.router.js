import {Router} from 'express';
import { usersRouter } from './users.router.js';
export const indexRouter = Router()

indexRouter.use('/users',usersRouter)
indexRouter.get('',(req,res)=>{
    res.write(`
        get Users => /users 
        get User => /users/:id
        Create User => /users
        Edit User => /users/:id
        deposit => /users/:id/deposit
        transfer => /users/:from/trans/:to  (from & to take ID's)
        update credit => /users/:id/update

        (Note: Use Patch Method and not PUT to edit/update)
    `)
    res.send()
})

import express from 'express';
import cors from 'cors';
import { indexRouter } from './routers/index.router.js';


const PORT = process.env.PORT || 5000;
const app = express()



app.use(express.json())
app.use(cors())

app.use('/',indexRouter)


app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`);
})
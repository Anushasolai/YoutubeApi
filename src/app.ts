import express from 'express';
import { checkConnection } from './server';
import router from './routes/youtubeRoutes'

const PORT=3001;
const app= express()
app.use(express.json())
app.use('/api', router)

app.listen(PORT,()=>{
    console.log(`server is running port${PORT}`);
    checkConnection()
   })

export default app;

import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToMongo from './Db/connectToMongo.js';
import authUserRoutes from './routes/authUser.routes.js';
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use("/auth", authUserRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening on the port ${process.env.PORT}`);
    connectToMongo();
})





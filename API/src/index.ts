import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import router from "./bank-accounts/route/route";

const app = express()

import { initDB } from './data_base/data_base'
const { PORT } = process.env;

initDB()

app.use(cors({
    origin: "*",
}))
app.use(bodyParser.json())

app.get("/WORKING!!!", async (req, res) => {
    return res.send("Api is working!");
});


app.use('/actions', router)


app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
})

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { gamesRouters } from "./routes/gamesRoutes.js";
import customersRouters from "./routes/customersRoutes.js"
import { rentalsRouters } from "./routes/rentalsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
const PORT = 5000;

app.use([gamesRouters, customersRouters, rentalsRouters])

app.listen(PORT, ()=> {
    console.log("Server is running!")
})
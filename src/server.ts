import express, {Request, Response} from "express";
import PetService from "./services/PetService";
import router from "./routes/routes";
import cors from "cors";
import errorMiddleware from "@utils/middlewares/error";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware)

app.get("/", (request: Request, response: Response) => {
    response.send("Olá");   
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
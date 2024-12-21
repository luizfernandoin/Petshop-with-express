import express, {Request, Response} from "express";
import UserService from "@services/PetService";
import router from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api", router);

app.get("/", (request: Request, response: Response) => {
    response.send("Olá");   
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
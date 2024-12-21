import { Request, Response } from "express";
import { Router } from "express";
import PetshopService from "../services/PetshopService";
import { Petshop, petshopDTO } from "src/@types/petshop";
import { isValidCNPJ } from "../utils/validators/validators";
//import { checkExistsUserAccount } from "@utils/middlewares/checkExistsUserAccount";

const petshopRouter = Router();
const petshopService = new PetshopService();

petshopRouter.get("/", async (request: Request, response: Response) => {
    try {
        const petshops: Petshop[] = await petshopService.getAllPetshops();
        response.json(petshops);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao buscar petshops' });
    }
});

petshopRouter.post("/", async (request: Request, response: Response) => {
    const { name, cnpj }: petshopDTO = request.body;

    if (!name || !cnpj) {
        response.status(400).json({ error: 'Faltando campos obrigatórios' });
    }

    if (!isValidCNPJ(cnpj)) {
        response.status(400).json({ error: 'CNPJ inválido. O formato correto é XX.XXX.XXX/XXXX-XX' });
    }

    try {
        const newPetshop = await petshopService.createPetshop({ name, cnpj });

        response.status(201).json(newPetshop);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Erro ao criar petshop' });
    }
});

petshopRouter.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    /*
    if (!request.petshop) {
        response.status(404).json({ error: "Petshop não está na requisição" });
    }

    if (request.petshop.id !== id) {
        response.status(403).json({ error: "O petshop do CNPJ não corresponde ao ID fornecido" });
    }
    */

    try {
        const deletedPetshop = await petshopService.deletePetshop(id);

        response.status(200).json({
            message: 'Petshop deletado com sucesso!',
            data: deletedPetshop,
        })
    } catch (error) {
        const message = (error as Error).message;
        response.status(500).json({
            message: 'Erro ao deletar o Petshop',
            error: message,
        });
    }
})


export default petshopRouter;
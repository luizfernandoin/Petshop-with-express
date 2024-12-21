import { Request, Response } from "express";
import { Router } from "express";
import PetshopService from "../services/PetshopService";
import { Petshop, petshopDTO, updatePetshopDTO } from "src/@types/petshop";
import { isValidCNPJ } from "../utils/validators/validators";
import { checkExistsPetshop } from "../utils/middlewares/checkExistsPetshop";
import { checkPetshop } from "@utils/middlewares/checkPetshop";

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
        return;
    }

    if (!isValidCNPJ(cnpj)) {
        response.status(400).json({ error: 'CNPJ inválido. O formato correto é XX.XXX.XXX/XXXX-XX' });
        return;
    }

    try {
        const newPetshop = await petshopService.createPetshop({ name, cnpj });

        response.status(201).json(newPetshop);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Erro ao criar petshop' });
    }
});

petshopRouter.delete("/:id", checkExistsPetshop, async (request: Request, response: Response) => {
    const { id } = request.params;

    if (!request.petshop) {
        response.status(404).json({ error: "Petshop não está na requisição" });
        return;
    }

    if (request.petshop.id !== id) {
        response.status(403).json({ error: "O petshop do CNPJ não corresponde ao ID fornecido" });
        return;
    }

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
});

petshopRouter.put("/:id", checkExistsPetshop, checkPetshop, async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, cnpj }: updatePetshopDTO = request.body;

    if (!name || !cnpj) {
        response.status(400).json({ error: 'Faltando campos obrigatórios' });
        return;
    }

    if (!isValidCNPJ(cnpj)) {
        response.status(400).json({ error: 'CNPJ inválido. O formato correto é XX.XXX.XXX/XXXX-XX' });
        return;
    }

    try {
        const updatedPetshop = await petshopService.updatePetshop(id, { name, cnpj });

        response.status(200).json(updatedPetshop);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Erro ao atualizar petshop' });
    }
})

petshopRouter.patch("/:id", checkExistsPetshop, checkPetshop, async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, cnpj }: updatePetshopDTO = request.body;

    if (!name && !cnpj) {
        response.status(400).json({ error: 'Nenhum dado fornecido para atualização' });
        return;
    }

    if (cnpj && !isValidCNPJ(cnpj)) {
        response.status(400).json({ error: 'CNPJ inválido. O formato correto é XX.XXX.XXX/XXXX-XX' });
        return;
    }

    try {
        const updatedPetshop = await petshopService.updatePetshop(id, { name, cnpj });

        response.status(200).json(updatedPetshop);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Erro ao atualizar petshop' });
    }
})

export default petshopRouter;
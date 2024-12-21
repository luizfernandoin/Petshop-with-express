import { Request, Response } from "express";
import { Router } from "express";
import { Pet, petDTO, updatePetDTO } from "src/@types/pet";
import PetService from "@services/PetService";
import { checkExistsPetshop } from "@utils/middlewares/checkExistsPetshop";


const petRouter = Router();
const petService = new PetService();

petRouter.get("/", checkExistsPetshop, async (request: Request, response: Response) => {
    if (!request.petshop) {
        response.status(404).json({ error: 'Petshop não está na requisição' });
        return;
    }

    try {
        const pets: Pet[] = await petService.getAllPets(request.petshop.id);
        response.json(pets);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao buscar petshops' });
    }
});

petRouter.post("/", checkExistsPetshop, async (request: Request, response: Response) => {
    const {name, type, description, deadline_vaccination}: petDTO = request.body;
    const { petshop } = request;

    if (!name || !type || !description || !deadline_vaccination) {
        response.status(400).json({ error: 'Dados inválidos' });
        return;
    }

    if(!petshop) {
        response.status(404).json({ error: 'Petshop não está na requisição' });
        return;
    }

    try {
        const newPet = await petService.createPet(
            {name, type, description, deadline_vaccination}, 
            petshop.id
        );

        response.status(201).json(newPet);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao cadastrar pet' });
    }
});

petRouter.delete("/:id", checkExistsPetshop, async (request: Request, response: Response) => {
    const { id } = request.params;

    if (!request.petshop) {
        response.status(404).json({ error: 'Petshop não está na requisição' });
        return;
    }

    try {
        const deletedPet = await petService.deletePet(id, request.petshop.id);

        response.status(202).json({ message : 'Pet deletado com sucesso', deletedPet });
    } catch (error) {
        response.status(500).json({ error: 'Erro ao deletar pet' });
    }
});

petRouter.put("/:id", checkExistsPetshop, async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, type, description, deadline_vaccination }: updatePetDTO = request.body;

    if (!name || !type || !description || !deadline_vaccination) {
        response.status(400).json({ error: 'Faltando campos obrigatórios' });
        return;
    }

    if (!request.petshop) {
        response.status(404).json({ error: 'Petshop não está na requisição' });
        return;
    }

    try {
        const updatedPet = await petService.updatePet(id, request.petshop.id, { name, type, description, deadline_vaccination });

        response.status(200).json(updatedPet);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao atualizar pet' });
    }
});

petRouter.patch("/:id", checkExistsPetshop, async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, type, description, deadline_vaccination }: updatePetDTO = request.body;

    if (!name && !type && !description && !deadline_vaccination) {
        response.status(400).json({ error: 'Nenhum campo para atualização foi informado!' });
        return;
    }

    if (!request.petshop) {
        response.status(404).json({ error: 'Petshop não está na requisição' });
        return;
    }

    try {
        const updatedPet = await petService.updatePet(id, request.petshop.id, { name, type, description, deadline_vaccination });

        response.status(200).json(updatedPet);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao atualizar pet' });
    }
});

petRouter.patch("/:id/vaccinated", checkExistsPetshop, async (request: Request, response: Response) => {
    const { id } = request.params;

    if (!request.petshop) {
        response.status(404).json({ error: 'Petshop não está na requisição' });
        return;
    }

    try {
        const updatedPet = await petService.vaccinatePet(id, request.petshop.id);

        if (!updatedPet) {
            response.status(404).json({ error: 'Pet not found' });
            return;
        }

        response.status(200).json(updatedPet);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao vacinar pet' });
    }
});


export default petRouter;
import HttpError from "@utils/errors/HttpError";
import { Pet, petDTO, updatePetDTO } from "../@types/pet";
import { pets, petshops } from "src/database/database";
import { v4 as uuidv4 } from 'uuid';


class PetService {
    async getAllPets(petshopId: string): Promise<Pet[]> {
        try {
            const petshop = petshops.find(petshop => petshop.id === petshopId);
    
            return petshop?.pets || [];
        } catch (error) {
            throw new Error('Erro ao buscar os pets');
        }
    }

    async createPet(newPet: petDTO, petshopId: string): Promise<Pet> {
        try {
            const petshop = petshops.find(petshop => petshop.id === petshopId);
            if (!petshop) {
                throw new Error('Petshop não encontrado');
            }

            const createdPet: Pet = {
                id: uuidv4(),
                name: newPet.name,
                type: newPet.type,
                description: newPet.description,
                vaccinated: false,
                deadline_vaccination: new Date(newPet.deadline_vaccination),
                created_at: new Date(),
                petshopId: petshopId
            };

            petshop.pets.push(createdPet);
            pets.push(createdPet);
            
            return createdPet;
        } catch (error) {
            throw new Error('Erro ao cadastrar pet');
        }
    }


    async deletePet(petId: string, petshopId: string): Promise<Pet | null> {
        try {
            const petshop = petshops.find(petshop => petshop.id === petshopId);
            if (!petshop) {
                return null;
            }
    
            const petIndex = petshop.pets.findIndex(pet => pet.id === petId);
            if (petIndex === -1) {
                return null;
            }
    
            const deletedPet = petshop.pets.splice(petIndex, 1)[0];
    
            return deletedPet;
        } catch (error) {
            throw new Error('Erro ao deletar pet');
        }
    }
    


    async updatePet(petId: string, petshopId: string, updatedPet: updatePetDTO): Promise<Pet | null> {
        try {
            const petshop = petshops.find(petshop => petshop.id === petshopId);
            if (!petshop) {
                return null;
            }
    
            const petIndex = petshop.pets.findIndex(pet => pet.id === petId);
            if (petIndex === -1) {
                throw new HttpError(`Pet com id ${petId} não exite no petshop ${petshopId}`, 404);
            }
    
            const updatedPetData = { ...petshop.pets[petIndex], ...updatedPet };
            petshop.pets[petIndex] = updatedPetData;
    
            return updatedPetData;
        } catch (error) {
            throw new HttpError('Erro ao atualizar pet', 500);
        }
    }
    


    async vaccinatePet(petId: string, petshopId: string): Promise<Pet | null> {
        try {
            const petshop = petshops.find(petshop => petshop.id === petshopId);
            if (!petshop) {
                return null;
            }
    
            const petIndex = petshop.pets.findIndex(pet => pet.id === petId);
            if (petIndex === -1) {
                return null;
            }
    
            petshop.pets[petIndex].vaccinated = true;
    
            return petshop.pets[petIndex];
        } catch (error) {
            throw new Error('Erro ao atualizar status de vacinação');
        }
    }
    
}


export default PetService;
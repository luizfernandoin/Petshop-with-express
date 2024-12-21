import { petDTO, updatePetDTO } from "src/@types/pet";
import prisma from "src/config/prismaClient";


class PetService {
    async getAllPets(petshopId: string) {
        try {
            const pets = await prisma.pet.findMany(
                {
                    where: {
                        petshopId
                    }
                }
            );

            return pets;
        } catch (error) {
            throw new Error('Erro ao buscar os pets');
        }
    }

    async createPet(newPet: petDTO, petshopId: string) {
        try {
            const pet = await prisma.pet.create({
                data: {
                    ...newPet,
                    petshopId
                }
            });

            return pet;
        } catch (error) {
            throw new Error('Erro ao cadastrar pet');
        }
    }

    async deletePet(petId: string, petshopId: string) {
        try {
            const deletedPet = await prisma.pet.delete({
                where: {
                    id: petId,
                    petshopId
                }
            });

            return deletedPet;
        } catch (error) {
            throw new Error('Erro ao deletar pet');
        }
    }

    async updatePet(petId: string, petshopId: string, updatedPet: updatePetDTO) {
        try {
            const pet = await prisma.pet.update({
                where: {
                    id: petId,
                    petshopId
                },
                data: updatedPet
            });

            return pet;
        } catch (error) {
            throw new Error('Erro ao atualizar pet');
        }
    }

    async vaccinatePet(petId: string, petshopId: string) {
        try {
            const pet = await prisma.pet.update({
                where: {
                    id: petId,
                    petshopId
                },
                data: {
                    vaccinated: true
                }
            });

            return pet;
        } catch (error) {
            throw new Error('Erro ao atualizar status de vacinação');
        }
    }
}


export default PetService;
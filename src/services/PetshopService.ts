import { Petshop, petshopDTO } from "src/@types/petshop";
import prisma from "../config/prismaClient";

class PetshopService {
    async getAllPetshops(): Promise<Petshop[]> {
        try {
            const petshops = await prisma.petshop.findMany({
                include: {
                  pets: true
                }
            });

            return petshops;
        } catch (error) {
            throw new Error('Erro ao buscar petshops');
        }    
    }

    async createPetshop(newPetshop: petshopDTO): Promise<Petshop> {
        try {
            const createdPetshop = await prisma.petshop.create({
                data: {
                    name: newPetshop.name,
                    cnpj: newPetshop.cnpj,
                },
                include: {
                    pets: true
                }
            });
    
            return createdPetshop;
        } catch (error) {
            throw new Error('Erro ao criar petshop')
        }
    }

    async deletePetshop(petshopId: string) {
        try {
            await prisma.pet.deleteMany({
                where: {
                    petshopId
                }
            });

            const deletedPetshop = await prisma.petshop.delete({
                where: {
                    id: petshopId
                }
            });

            return deletedPetshop;
        } catch (error) {
            throw new Error("Erro ao deletar o petshop");
        }
    }
}

export default PetshopService;
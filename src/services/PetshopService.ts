import { Petshop, petshopDTO, updatePetshopDTO } from "../@types/petshop";
import { petshops } from "src/database/database";
import { v4 as uuidv4 } from 'uuid';

class PetshopService {
    async getAllPetshops(): Promise<Petshop[]> {
        try {
            return petshops;
        } catch (error) {
            throw new Error('Erro ao buscar petshops');
        }    
    }

    async getPetshopByCNPJ(cnpj: string): Promise<Petshop | undefined> {
        try {
            const petshop = petshops.find(petshop => petshop.cnpj === cnpj);

            return petshop;
        } catch (error) {
            throw new Error('Erro ao buscar petshop por CNPJ');
        }
    }

    async createPetshop(newPetshop: petshopDTO): Promise<Petshop> {
        try {
            const createdPetshop: Petshop = {
                id: uuidv4(),
                name: newPetshop.name,
                cnpj: newPetshop.cnpj,
                pets: [],
            };

            petshops.push(createdPetshop);
    
            return createdPetshop;
        } catch (error) {
            throw new Error('Erro ao criar petshop')
        }
    }

    async deletePetshop(petshopId: string) {
        try {
            const petshopToDelete = petshops.find(petshop => petshop.id === petshopId);

            if (!petshopToDelete) {
                return null;
            }

            const index = petshops.indexOf(petshopToDelete);
            if (index > -1) {
                petshops.splice(index, 1);
            }

            return petshopToDelete;
        } catch (error) {
            throw new Error("Erro ao deletar o petshop");
        }
    }

    async updatePetshop(petshopId: string, newPetshop: updatePetshopDTO) {
        try {
            const indexPetshop = petshops.findIndex(petshop => petshop.id === petshopId);

            if (indexPetshop < 0) {
                return null;
            }
    
            petshops[indexPetshop] = {
                ...petshops[indexPetshop],
                ...newPetshop,
            };

            return petshops[indexPetshop];
        } catch (error) {
            throw new Error("Erro ao atualizar o petshop");
        }
    }
}

export default PetshopService;
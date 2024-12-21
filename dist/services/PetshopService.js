"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
class PetshopService {
    async getAllPetshops() {
        try {
            const petshops = await prismaClient_1.default.petshop.findMany({
                include: {
                    pets: true
                }
            });
            return petshops;
        }
        catch (error) {
            throw new Error('Erro ao buscar petshops');
        }
    }
    async createPetshop(newPetshop) {
        try {
            const createdPetshop = await prismaClient_1.default.petshop.create({
                data: {
                    name: newPetshop.name,
                    cnpj: newPetshop.cnpj,
                },
                include: {
                    pets: true
                }
            });
            return createdPetshop;
        }
        catch (error) {
            throw new Error('Erro ao criar petshop');
        }
    }
    async deletePetshop(petshopId) {
        try {
            await prismaClient_1.default.pet.deleteMany({
                where: {
                    petshopId
                }
            });
            const deletedPetshop = await prismaClient_1.default.petshop.delete({
                where: {
                    id: petshopId
                }
            });
            return deletedPetshop;
        }
        catch (error) {
            throw new Error("Erro ao deletar o petshop");
        }
    }
}
exports.default = PetshopService;

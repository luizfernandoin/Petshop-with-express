"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PetshopService_1 = __importDefault(require("../services/PetshopService"));
const validators_1 = require("../utils/validators/validators");
const checkExistsUserAccount_1 = require("../utils/middlewares/checkExistsUserAccount");
const petshopRouter = (0, express_1.Router)();
const petshopService = new PetshopService_1.default();
petshopRouter.get("/", async (request, response) => {
    try {
        const petshops = await petshopService.getAllPetshops();
        response.json(petshops);
    }
    catch (error) {
        response.status(500).json({ error: 'Erro ao buscar petshops' });
    }
});
petshopRouter.post("/", async (request, response) => {
    const { name, cnpj } = request.body;
    if (!name || !cnpj) {
        response.status(400).json({ error: 'Faltando campos obrigatórios' });
    }
    if (!(0, validators_1.isValidCNPJ)(cnpj)) {
        response.status(400).json({ error: 'CNPJ inválido. O formato correto é XX.XXX.XXX/XXXX-XX' });
    }
    try {
        const newPetshop = await petshopService.createPetshop({ name, cnpj });
        response.status(201).json(newPetshop);
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Erro ao criar petshop' });
    }
});
petshopRouter.delete("/:id", checkExistsUserAccount_1.checkExistsUserAccount, async (request, response) => {
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
        });
    }
    catch (error) {
        const message = error.message;
        response.status(500).json({
            message: 'Erro ao deletar o Petshop',
            error: message,
        });
    }
});
exports.default = petshopRouter;

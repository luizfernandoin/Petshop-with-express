"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistsUserAccount = checkExistsUserAccount;
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
async function checkExistsUserAccount(request, response, next) {
    const { cnpj } = request.headers;
    if (!cnpj || typeof cnpj !== "string") {
        response.status(400).json({ error: "CNPJ é obrigatório e deve ser uma string" });
        return;
    }
    try {
        const petshop = await prismaClient_1.default.petshop.findUnique({
            where: { cnpj },
        });
        if (!petshop) {
            response.status(404).json({ error: `O petshop com o cnpj ${cnpj} não existe.` });
            return;
        }
        request.petshop = petshop;
        next();
    }
    catch (error) {
        response.status(500).json({ error: "Internal server error" });
    }
}

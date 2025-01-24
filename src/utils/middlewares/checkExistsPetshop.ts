import { NextFunction, Request, Response } from "express";
import { petshops } from "src/database/database";


export async function checkExistsPetshop(request: Request, response: Response, next: NextFunction) {
    const { cnpj } = request.headers;

    if (!cnpj || typeof cnpj !== "string") {
        response.status(400).json({ error: "CNPJ é obrigatório e deve ser uma string" });
        return;
    }

    try {
        const petshop = petshops.find(petshop => petshop.cnpj === cnpj);

        if (!petshop) {
            response.status(404).json({ error: `O petshop com o cnpj ${cnpj} não existe.` });
            return;
        }

        request.petshop = petshop;
        next();
    } catch (error) {
        response.status(500).json({ error: "Internal server error" });
        return;
    }
}
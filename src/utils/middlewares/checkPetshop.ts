import { Request, Response, NextFunction } from 'express';

export function checkPetshop(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    if (!request.petshop) {
        response.status(404).json({ error: "Petshop não está na requisição" });
        return;
    }

    if (request.petshop.id !== id) {
        response.status(403).json({ error: "O petshop do CNPJ não corresponde ao ID fornecido" });
        return;
    }

    next();
}

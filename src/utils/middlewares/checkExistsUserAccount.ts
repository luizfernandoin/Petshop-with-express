/*
import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prismaClient";

export async function checkExistsUserAccount(request: Request, response: Response, next: NextFunction) {
    const { cnpj } = request.headers;

    if (!cnpj || typeof cnpj !== "string") {
        return response.status(400).json({ error: "CNPJ é obrigatório e deve ser uma string" });
    }

    try {
        const petshop = await prisma.petshop.findUnique({
            where: { cnpj },
        });

        if (!petshop) {
            return response.status(404).json({ error: "Usuario não existe" });
        }

        request.petshop = petshop;
        next();
    } catch (error) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
*/

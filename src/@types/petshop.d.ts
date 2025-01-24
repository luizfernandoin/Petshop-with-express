import { Pet } from './pet';

export interface Petshop {
    id: string;
    name: string;
    cnpj: string;
    pets: Pet[];
}

export interface petshopDTO {
    name: string;
    cnpj: string;
}

export interface updatePetshopDTO {
    name?: string;
    cnpj?: string;
}
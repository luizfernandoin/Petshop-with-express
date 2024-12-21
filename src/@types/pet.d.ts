import exp from 'constants';
import { Petshop } from './petshop';

export interface Pet {
    id: string;
    name: string;
    type: string;
    description: string;
    vaccinated: string;
    deadline_vaccination: Date;
    created_at: Date;
    petshopId: string;
}

export interface petDTO {
    name: string;
    type: string;
    description: string;
    vaccinated: string;
    deadline_vaccination: string;
}

export interface updatePetDTO {
    name?: string;
    type?: string;
    description?: string;
    vaccinated?: string;
    deadline_vaccination?: string;
}
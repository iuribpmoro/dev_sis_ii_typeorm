import Client from '../entities/Clients';
import IClient from "../interfaces/IClient";
import { AppDataSource } from "../database/data-source";
import HttpException from "../shared/http.exeception";

const clientsRepository = AppDataSource.getRepository(Client);

const isValid = (client: IClient) => {
    if (!client.name || typeof client.name !== "string") return false;

    return true;
};

const newClient = async (client: IClient): Promise<IClient> => {
    if (!isValid(client)) {
        throw new HttpException(400, "Invalid data!");
    }
    const createdClient = await clientsRepository.save(client);
    return createdClient as IClient;
}

const getClients = (): Promise<IClient[]> => {
    return clientsRepository.find();
}

const getClientById = (cpf: string): Promise<IClient | null> => {
    return clientsRepository.findOneBy({ cpf });
}

const updateClient = async (cpf: string, client: IClient): Promise<IClient> => {
    if (!isValid(client)) {
        throw new HttpException(400, "Dados inválidos");
    }
    await clientsRepository.update(cpf, client);

    return client as IClient;
}

const removeClient = async (cpf: string): Promise<void> => {
    await clientsRepository.delete(cpf);
}

export default { getClients, newClient, getClientById, updateClient, removeClient };
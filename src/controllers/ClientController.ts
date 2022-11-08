import { Request, Response, Router } from "express";
import Client from '../entities/Clients';
import ClientRepository from '../repositories/ClientRepository';
import IClient from '../interfaces/IClient';

const clientRouter = Router();

clientRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
    const clients = await ClientRepository.getClients();

    return res.status(200).json(clients);
});

clientRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
    const clients = await ClientRepository.newClient(req.body);
    return res.status(200).json(clients);
});

clientRouter.get("/:cpf", async (req: Request, res: Response): Promise<Response> => {
    const cpf = req.params.cpf;
    const clients = await ClientRepository.getClientById(cpf);

    return res.status(200).json(clients);
});

clientRouter.put("/:cpf", async (req: Request, res: Response): Promise<Response> => {
    const cpf = req.params.cpf;
    const client = await ClientRepository.updateClient(cpf, req.body);

    return res.status(201).json(client);
})

clientRouter.delete("/:cpf", async (req: Request, res: Response): Promise<Response> => {
    const cpf = req.params.cpf;
    await ClientRepository.removeClient(cpf);

    return res.status(201).json({message: 'Registro removido com sucesso'});
})

export default clientRouter;
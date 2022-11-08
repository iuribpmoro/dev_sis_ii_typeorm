import { Request, Response, Router } from "express";
import Court from '../entities/Courts';
import CourtRepository from '../repositories/CourtRepository';
import ICourt from '../interfaces/ICourt';

const courtRouter = Router();

courtRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
    const courts = await CourtRepository.getCourts();

    return res.status(200).json(courts);
});

courtRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
    const courts = await CourtRepository.newCourt(req.body);
    return res.status(200).json(courts);
});

courtRouter.get("/:id", async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const courts = await CourtRepository.getCourtById(id);

    return res.status(200).json(courts);
});

courtRouter.put("/:id", async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const court = await CourtRepository.updateCourt(id, req.body);

    return res.status(201).json(court);
})

courtRouter.delete("/:id", async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await CourtRepository.removeCourt(id);

    return res.status(201).json({message: 'Registro removido com sucesso'});
})

export default courtRouter;
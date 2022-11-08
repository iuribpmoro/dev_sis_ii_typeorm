import { Request, Response, Router } from "express";
import Reservation from '../entities/Reservations';
import ReservationRepository from '../repositories/ReservationRepository';
import IReservation from '../interfaces/IReservation';

const ReservationRouter = Router();

ReservationRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
    const reservations = await ReservationRepository.getReservations();

    return res.status(200).json(reservations);
});

ReservationRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
    const reservations = await ReservationRepository.newReservation(req.body);
    return res.status(200).json(reservations);
});

ReservationRouter.get("/:id", async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const reservations = await ReservationRepository.getReservationById(id);

    return res.status(200).json(reservations);
});

ReservationRouter.put("/:id", async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const reservation = await ReservationRepository.updateReservation(id, req.body);

    return res.status(201).json(reservation);
})

ReservationRouter.delete("/:id", async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await ReservationRepository.removeReservation(id);

    return res.status(201).json({message: 'Registro removido com sucesso'});
})

export default ReservationRouter;
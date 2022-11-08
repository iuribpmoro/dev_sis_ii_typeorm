import Reservation from '../entities/Reservations';
import IReservation from "../interfaces/IReservation";
import { AppDataSource } from "../database/data-source";
import HttpException from "../shared/http.exeception";
import { differenceInHours } from 'date-fns';
import { MoreThan } from 'typeorm';

const reservationsRepository = AppDataSource.getRepository(Reservation);

const getReservationByBeginDatetime = async (reservationBeginDatetime: Date): Promise<IReservation | null> => {
    return reservationsRepository.findOneBy({begin_datetime: reservationBeginDatetime});
}

const newReservation = async (reservation: IReservation): Promise<IReservation> => {
    const reservationToCreate = {
        ...reservation,
        end_datetime: new Date(reservation.begin_datetime)
    }
    const existsReservation = await getReservationByBeginDatetime(reservationToCreate.begin_datetime);
    if(existsReservation) {
        throw new HttpException(400, "This period is not available!");
    }
    
    reservationToCreate.begin_datetime = new Date(reservationToCreate.begin_datetime);
    reservationToCreate.end_datetime.setHours(reservationToCreate.end_datetime.getHours() + 2);
     
    const createdReservation = await reservationsRepository.save(reservationToCreate as Reservation);
    return createdReservation as IReservation;
}

const getReservations = (): Promise<IReservation[]> => {
    return reservationsRepository.find({relations: {clients: true, courts: true} });
}

const getReservationById = (id: number): Promise<IReservation | null> => {
    return reservationsRepository.findOneBy({ id });
}

const updateReservation = async (id: number, reservation: IReservation): Promise<IReservation> => {
    await reservationsRepository.update(id, reservation);

    return reservation as IReservation;
}

const removeReservation = async (id: number): Promise<void> => {
    const reservationExist = await reservationsRepository.findOneBy({ id });
    if(!reservationExist) {
        throw new HttpException(400, `Not Found: Not Record with the Id: ${id} was found!`);
    }

    const timeDifference = differenceInHours(new Date(reservationExist.begin_datetime), new Date());
    
    if(timeDifference <= 4) {
        throw new HttpException(400, `You can't remove the reservation! You have to Cancel this reservation!`);
    }
    
    await reservationsRepository.delete(id);
}

export default { getReservations, newReservation, getReservationById, updateReservation, removeReservation };
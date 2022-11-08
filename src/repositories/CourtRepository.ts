import Court from '../entities/Courts';
import ICourt from "../interfaces/ICourt";
import { AppDataSource } from "../database/data-source";
import HttpException from "../shared/http.exeception";

const courtsRepository = AppDataSource.getRepository(Court);

const isValid = (court: ICourt) => {
    if (!court.name || typeof court.name !== "string") return false;

    return true;
};

const newCourt = async (court: ICourt): Promise<ICourt> => {
    if (!isValid(court)) {
        throw new HttpException(400, "Invalid data!");
    }
    const createdCourt = await courtsRepository.save(court);
    return createdCourt as ICourt;
}

const getCourts = (): Promise<ICourt[]> => {
    return courtsRepository.find();
}

const getCourtById = (id: number): Promise<ICourt | null> => {
    return courtsRepository.findOneBy({ id });
}

const updateCourt = async (id: number, court: ICourt): Promise<ICourt> => {
    if (!isValid(court)) {
        throw new HttpException(400, "Dados inválidos");
    }
    await courtsRepository.update(id, court);

    return court as ICourt;
}

const removeCourt = async (id: number): Promise<void> => {
    await courtsRepository.delete(id);
}

export default { getCourts, newCourt, getCourtById, updateCourt, removeCourt };
import Client from "../entities/Clients";
import Court from "../entities/Courts";

interface IReservation {
    id?: number;
    begin_datetime: Date;
    end_datetime?: Date;
    value: number;
    confirmed: boolean;
    client_cpf: string;
    court_id: number;
}

export default IReservation;
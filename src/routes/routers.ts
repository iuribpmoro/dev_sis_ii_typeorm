import { Router } from "express";
import ClientController from "../controllers/ClientController";
import CourtController from "../controllers/CourtController";
import ReservationController from "../controllers/ReservationController";
const routers = Router();

routers.use("/client", ClientController);
routers.use("/court", CourtController);
routers.use("/reservation", ReservationController);

export default routers;
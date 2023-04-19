import { Router } from "express";
import gamesController from "../controllers/gamesController";

class GamesRoute {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get("/", gamesController.index );
    }
}

const gamesRoutes = new GamesRoute();
export default gamesRoutes.router;
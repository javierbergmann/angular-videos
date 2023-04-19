import { Request, Response } from "express";

class IndexController {
    public index(req: Request, res: Response){
        res.send("Bienvenidos a la página de Games");
    }
}

const indexController = new IndexController();
export default indexController;
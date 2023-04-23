import { Request, Response } from "express";
import pool from "../database";

class GamesController {
    public async list(req: Request, res: Response): Promise<void>{
        const games =  await pool.query("select * from game");
        //res.set('Access-Control-Allow-Origin', '*');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const game = await pool.query("select * from game where id_game = ?", [id]);
        if (game.length > 0){
            return res.json(game[0]);
        }
        res.status(404).json({ detail: "The game doesn't exits." });
    }

    public async update(req: Request, res:Response): Promise<any>{
        const { id } = req.params;

        interface Game{
            title: string,
            description: string,
            image: string
        }

        const { title:title, description:description, image:image} = req.body;

        const new_game: Game = {
            title: title,
            description: description,
            image: image
        }

        await pool.query('update game set ? where id_game = ?', [new_game, id]);
        res.json({detail: "Game saved successfully."});
    }

    public async create(req: Request, res: Response): Promise<void>{
        
        interface Game{
            title: string,
            description: string,
            image: string
        }

        const { title:title, description:description, image:image} = req.body;
        const game: Game = {
            title: title,
            description: description,
            image: image
        }

        await pool.query('insert into game set ?', game);
        res.json({detail: "Game saved successfully."});
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query("delete from game where id_game = ?", [id]);
        res.json({detail: "Game deleted succefully."});
    }

}

const gamesController = new GamesController();
export default gamesController;
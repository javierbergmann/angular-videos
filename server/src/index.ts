import express, {Application} from 'express';
import cors from 'cors';

import indexRoute from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';

class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void{
        this.app.use("/", indexRoute);
        this.app.use("/api/games", gamesRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log("Run on port ", this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();


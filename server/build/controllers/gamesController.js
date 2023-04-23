"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query("select * from game");
            //res.set('Access-Control-Allow-Origin', '*');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query("select * from game where id_game = ?", [id]);
            if (game.length > 0) {
                return res.json(game[0]);
            }
            res.status(404).json({ detail: "The game doesn't exits." });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title: title, description: description, image: image } = req.body;
            const new_game = {
                title: title,
                description: description,
                image: image
            };
            yield database_1.default.query('update game set ? where id_game = ?', [new_game, id]);
            res.json({ detail: "Game saved successfully." });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title: title, description: description, image: image } = req.body;
            const game = {
                title: title,
                description: description,
                image: image
            };
            yield database_1.default.query('insert into game set ?', game);
            res.json({ detail: "Game saved successfully." });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("delete from game where id_game = ?", [id]);
            res.json({ detail: "Game deleted succefully." });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;

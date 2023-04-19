"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send("Bienvenidos a la página de Games");
    }
}
const indexController = new IndexController();
exports.default = indexController;

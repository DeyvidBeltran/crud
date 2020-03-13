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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM usuarios');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return res.json(response.rows);
});
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, edad, direccion } = req.body;
    const response = yield database_1.pool.query('INSERT INTO usuarios (nombre, correo, edad, direccion) VALUES ($1, $2, $3, $4)', [nombre, correo, edad, direccion]);
    return res.json({
        message: 'User created succesfully',
        body: {
            user: {
                nombre,
                correo,
                edad,
                direccion
            }
        }
    });
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombre, correo, edad, direccion } = req.body;
    yield database_1.pool.query('UPDATE usuarios SET nombre=$1 , correo=$2, edad=$3, direccion=$4 WHERE id= $5', [nombre, correo, edad, direccion, id]);
    return res.json(`User ${id} update succesfully`);
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('DELETE FROM usuarios WHERE id= $1', [id]);
    return res.json(`User ${id} deleted Succesfully`);
});

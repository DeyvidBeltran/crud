import {Request, Response} from 'express'
import {QueryResult} from 'pg'

import { pool } from '../database'

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try{
    const response: QueryResult = await pool.query('SELECT * FROM usuarios');
    return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal Server error');
    }
}

export const getUserbyId = async (req: Request, res: Response): Promise <Response> => {
    const id = parseInt(req.params.id)
    const response: QueryResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return res.json(response.rows);
}
 export const createUser = async (req: Request, res: Response): Promise <Response> => {
    const { nombre, correo, edad, direccion} = req.body;
    const response: QueryResult = await pool.query('INSERT INTO usuarios (nombre, correo, edad, direccion) VALUES ($1, $2, $3, $4)', [nombre, correo, edad, direccion]);
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
    })
}
export const updateUser = async (req: Request, res: Response): Promise <Response> => {
    const id = parseInt(req.params.id);
    const { nombre, correo, edad, direccion } = req.body;

    await pool.query('UPDATE usuarios SET nombre=$1 , correo=$2, edad=$3, direccion=$4 WHERE id= $5', [nombre, correo, edad, direccion, id]);
    return res.json(`User ${id} update succesfully`)
}
export const deleteUser = async (req: Request, res: Response): Promise <Response> => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM usuarios WHERE id= $1', [id]);
    return res.json(`User ${id} deleted Succesfully`)
} 
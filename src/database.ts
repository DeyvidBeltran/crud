import {Pool} from 'pg'

export const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password:  '',
    database: 'usuarios',
    port: 5432
})
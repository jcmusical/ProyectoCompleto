import { Router } from "express";
import pool from "../database.js";
/** pool viene de databse.js */

const router = Router();

router.get('/list', async(req, res) => {
    /* [result] pq array */
    try {
        const [result] = await pool.query('SELECT * FROM personas');
        /* console.log(result); */
        res.render('personas/list', {personas: result})
    } catch (error){ /** estado de que el svr esta caido */
        res.status(500).json({message: error.message});
    }
});

export default router;

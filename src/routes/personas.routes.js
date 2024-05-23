import { Router } from "express";
import pool from "../database.js";
/** pool viene de databse.js */

const router = Router();
router.get('/add', (req, res)=>{
    res.render('personas/add')
});

router.post('/add', async (req, res)=>{
    try {
        const { name, lastname, age} = req.body
        const newPersona = {
            name, lastname, age
        }
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

/* Para borrar registro - Mirar que metodo es , usar en programacion paramtero */
router.get('/delete/:id', async(req, res)=> {
    try {
        //console.log(req.params)
        // id es arreglo de objetos
        const {id} = req.params
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

export default router;

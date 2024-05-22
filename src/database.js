import { createPool } from "mysql2/promise"
/* Los del XAMM el puerto es 3306  */
const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'prueba01',
    password: 'prueba01',
    database: 'prueba01'
});

export default pool; /* Exporta la var pool (contiene conexion a la BD para que otro archivo lo use*/

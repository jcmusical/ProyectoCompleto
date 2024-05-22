/* -------------------------- Import Importar dependencias ------------------------- */
import express from 'express'; //Metodos generales
import morgan from 'morgan';
import {join, dirname} from 'path' //Metodos especificos
import {fileURLToPath} from 'url'
import { engine } from 'express-handlebars';
import personasRoutes from './routes/personas.routes.js'

/* ----------------------------- Inicializacion ----------------------------- */
const app = express();
/* ----------------- Evitar colisiones de nombre de variable ---------------- */
const __dirname = dirname(fileURLToPath(import.meta.url));

/* ------------------------- console.log(__dirname); ------------------------ */

/* -------------------------------- Settings -------------------------------- */
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));

/* ------------------------- Manejador de plantillas ------------------------ */
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
console.log(__dirname);
console.log(app.get('views'));
console.log(app.get('views'), 'layouts');
app.set('view engine', '.hbs')  /* es la variable que tiene la extensión esta lista*/

/* ------------------------------- Middlewares ------------------------------ */
app.use(morgan('dev')); //Peticiones y estado
app.use(express.urlencoded({ extended: false }));   //Decodificar info de la URL se apago (FALSE)
app.use(express.json());    //Para que le llegue siempre un JSON


/* --------------------------------- routes --------------------------------- */
/* api / req = peticion , res = respuesta */
app.get('/', (req, res) => {
    /* ------------------ res.json({"message" : "Hola Mundo"}) ------------------ */
    res.render('index') /* Renderizado por {{{body}}} y el */
});
app.use(personasRoutes);

/* ------------------------------ Public files ------------------------------ */
app.use(express.static(join(__dirname, 'public')))

/* ------------------------------- Run server ------------------------------- */
/* Tenemos configurado nuestro servidor con nuestro puerto */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});


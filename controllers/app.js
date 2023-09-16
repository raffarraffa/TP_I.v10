import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import debug from "../utils/utiles.js";
// importacion rutas
import userRouter from '../routes/user_route.js';
import gameRouter from '../routes/game_route.js';
class App {
    constructor() {
        // Define el entorno aquí o pásalo como argumento
        this.entorno = process.env.NODE_ENV || 'dev';
        this.verificaEntorno();
        this.app = express();
        this.databaseUrl = process.env.DATABASE_URL;
        this.databaseUser = process.env.DATABASE_USER;
        this.databasePort = process.env.DATABASE_PORT;
        this.databaseName = process.env.DATABASE_NAME;
        this.databasePass = process.env.DATABASE_PASS;
        this.databasePrefix = process.env.DATABASE_PREFIX;
        this.databaseSsl = process.env.DATABASE_SSL;
        this.port = process.env.APP_PORT || 3000;
        this.configureMiddleware();
        this.configureRoutes();
        this.start();
    }
    verificaEntorno() {
        this.entorno === 'dev' ? dotenv.config({ path: './config.dev.env' }) : dotenv.config({ path: './config.prod.env' });
    }
    configureMiddleware() {
        // Configura middleware, como bodyParser, cors
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
    }
    configureRoutes() {
        // Configura las rutas de la aplicación
        this.app.use(express.static('public'));    // archivos estaticos
        this.app.use('/user', userRouter);
        this.app.use('/game', gameRouter);
        // error 404 si no encuentra ruta
        this.app.use((req, res, next) => {
            res.status(404).send('Error 404 - Página no encontrada');
        });
    }
    start() {
        // Inicia el servidor
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}
export default App;

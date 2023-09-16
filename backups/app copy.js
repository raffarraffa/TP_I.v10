import express from 'express';
import dotenv from 'dotenv';
import debug from "../utils/utiles.js";
/***/
/*import usersRouter from '../routes/user_route.js';
/*import gameRouter from '../routes/game_route.js';
/***/
// importacion rutas
import usersRouter from '../routes/user_route.js';
import gameRouter from '../routes/game_route.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename).split('\\');
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
        //     this.version = false;
        this.start();
    }
    verificaEntorno() {
        // Usa this.entorno en lugar de entorno
        this.entorno === 'dev' ? dotenv.config({ path: './config.dev.env' }) : dotenv.config({ path: './config.prod.env' });
        // this.databaseUrl = process.env.DATABASE_URL;
        // this.databaseUser = process.env.DATABASE_USER;
        // this.databasePort = process.env.DATABASE_PORT;
        // this.databaseName = process.env.DATABASE_NAME;
        // this.databasePass = process.env.DATABASE_PASS;
        // this.databasePrefix = process.env.DATABASE_PREFIX;
        // this.databaseSsl = process.env.DATABASE_SSL;
        // this.port = process.env.APP_PORT || 3000;
    }
    configureMiddleware() {
        // Configura middleware, como bodyParser, cors, autenticación, etc.
        // this.app.use(bodyParser.json());
        // this.app.use(cors());

        // ...
    }
    configureRoutes() {
        this.app.use('/api/:version', (req, res, next) => {
            debug(req.params);
            const ver = req.params.version;
            const regex = /^v[0-9]$/;
            if (regex.test(ver)) {
                this.version = ver;
                res.send(`${ver} esla version actual`);
                //    next();
            } else {
                res.status(400).send('...');
            }
        });
        // Configura las rutas de la aplicación
        //  app.use(express.static('public'));
        this.app.use(express.static('public', { index: 'index.html' }));
        // this.app.get('/', (req, res) => { res.send('¡Hola, mundo!'); });
        this.app.use('/users', usersRouter);
        this.app.use('/games', gameRouter);
        this.app.use((req, res, next) => {
            res.status(404).send('Error 404 - Página no encontrada');
        });
        // this.app.use('/api/posts', postRouter);
        // ...
    }

    start() {
        // Inicia el servidor
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default App;

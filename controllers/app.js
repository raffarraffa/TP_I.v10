// App.mjs
import express from 'express';
import dotenv from 'dotenv';
const entorno = process.env.NODE_ENV || dev1;
entorno === 'dev' ? dotenv.config({ path: 'config.dev.env' }) : dotenv.config({ path: 'config.prod.env' });
class App {

    //console.log(`entorno: ${entorno} `);
    constructor() {
        this.app = express();
        this.databaseUrl = process.env.DATABASE_URL,
            //        DATABASE_URL=ep-round-mud-58521732.ap-southeast-1.aws.neon.tech
            this.databaseUser = process.env.DATABASE_USER,
            this.databasePort = process.env.DATABASE_PORT,
            this.databaseName = process.env.DATABASE_NAME,
            this.databasePass = process.env.DATABASE_PASS,
            this.databasePrefix = process.env.DATABASE_PREFIX,
            this.databaseSsl = process.env.DATABASE_SSL,
            this.port = process.env.APP_PORT || 3000;
        // Configura middleware y rutas aquí
        this.configureMiddleware();
        this.configureRoutes();
    }

    configureMiddleware() {
        // Configura middleware, como bodyParser, cors, autenticación, etc.
        // this.app.use(bodyParser.json());
        // this.app.use(cors());
        // ...
    }

    configureRoutes() {
        // Configura las rutas de la aplicación
        this.app.get('/', (req, res) => {
            res.send('¡Hola, mundo!');
        });
        // this.app.use('/api/users', userRouter);
        // this.app.use('/api/posts', postRouter);
        // ...
    }

    start() {
        // Inicia el servidor
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port} `);
        });
    }
}

export default App;

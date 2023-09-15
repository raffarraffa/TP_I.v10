// App.mjs
class Game {
    constructor() {
        this.url = express();
        this.port = process.env.PORT || 3000;

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
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default App;

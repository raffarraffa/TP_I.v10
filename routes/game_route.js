import Express from "express";
const gameRouter = Express.Router();

/* GET */
gameRouter.get('/', function (req, res, next) {
    res.send('responder con GET game');
});
gameRouter.get('/preguntas', function (req, res, next) {
    res.send('responder con GET preguntas');
});
/* POST */
gameRouter.post('/', function (req, res, next) {
    res.send('responder con POST game');
});
gameRouter.post('/respuesta', function (req, res, next) {
    // controla el resultado de una repuesta , deb devolver el vlaor correcto de una pregunta
    //res.send('responder con POST respuesta');
    res.send('controla el resultado de una repuesta , deb devolver el vlaor correcto de una pregunta');
});
export default gameRouter;

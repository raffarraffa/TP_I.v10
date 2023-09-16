import Express from "express";
const gameRouter = Express.Router();

/* GET */
gameRouter.get('/', function (req, res, next) {
    res.send('responder con GET game');
});
/* POST */
gameRouter.post('/', function (req, res, next) {
    res.send('responder con POST game');
});
export default gameRouter;

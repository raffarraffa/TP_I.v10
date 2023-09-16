import Express from "express";
const userRouter = Express.Router();

/* GET users listing. */
userRouter.get('/', function (req, res, next) {
    res.send('responde GET user');
});

export default userRouter;

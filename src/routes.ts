import {Request, Response, type Express} from "express";
import tokenController from "./controllers/tokenController";
import authorizeController from "./controllers/authorizeController";

export function routes(app: Express) {
    app.get("/", (_req: Request, res: Response) => {
        res.render('index', {title: 'One Login Sim Stub'});
    });

    app.get("/start", authorizeController);

    app.get('/oidc/authorization-code/callback', tokenController);
}
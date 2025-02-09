import express from "express";
import path from "node:path";
import {config} from "./config";
import {routes} from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

routes(app);

app.listen(config.port, () => {
    console.log(`[server]: Server is running at http://localhost:${config.port}`);
});

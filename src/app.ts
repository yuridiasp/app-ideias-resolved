import express from "express";
import path from "path";

import router from './routes/routes'
import { error404 } from "./middlewares/404";

export const createApp = () => {
    const app = express();

    app.use(express.static(path.join(__dirname, "public")));

    app.set('view engine', 'ejs');

    app.set('views', path.join(__dirname, 'views'));

    app.use("/", router);

    app.use(error404);

    return app;
};
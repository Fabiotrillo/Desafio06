import express from 'express';
import __dirname from './utils.js';
import { engine } from 'express-handlebars';
import {ProductRouter} from './routes/products.router.js'
import {CartRouter} from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionRouter from './routes/sessions.router.js'
import passport from 'passport';
import inicializePassport from './config/passport.config.js';
import {config} from "./config/config.js"




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
});

const connection = mongoose.connect(config.mongo.url);  

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + "/public"));

app.use(session({
    store: new MongoStore({
        mongoUrl: config.mongo.url,
        ttl: 3600
    }),
    secret: "SecrectCode",
    resave: false,
    saveUninitialized: false
}));

app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);

inicializePassport();
app.use(passport.initialize());
app.use(passport.session());







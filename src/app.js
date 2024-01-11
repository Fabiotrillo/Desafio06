import express from 'express';
import __dirname from './utils.js';
import { ProductRouter } from './routes/products.router.js';
import { CartRouter } from './routes/carts.router.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionRouter from './routes/sessions.router.js'





const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO = "mongodb+srv://fabiotrillo:Eskakaroto10@cluster0.da2dilu.mongodb.net/Ecommerce";
const connection = mongoose.connect(MONGO);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.engine("handlebars",engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + "/public"));

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:"SecrectCode",
    resave:false,
    saveUninitialized:false

}))

app.use("/", viewsRouter)
app.use("/api/sessions", sessionRouter)
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);








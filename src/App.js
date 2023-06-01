import 'dotenv/config.js'
import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import routerUser from "./routes/user.routes.js";
import routerLogger from './routes/logger.routes.js';
import routerSession from "./routes/session.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { __dirname, __filename } from "./path.js";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from './config/passport.js'
import mongoose from "mongoose";
import MongoStore from 'connect-mongo'
import session from 'express-session'
import routerMocking from './routes/mocking.routes.js';
import { addLogger } from './utils/logger.js';

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`);
});


//Connect DB
const connectionMongoose = async () => {
  try {
    await mongoose.connect(process.env.URLMONGODB)
    console.log("DB is connected")
  } catch (error) {
    console.log(error) 
  }
};
connectionMongoose()


//Session

app.use(session({
  store: MongoStore.create({
      mongoUrl: process.env.URLMONGODB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 180
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))



//HBS
app.get("/",  (req, res) => {
  res.render("home", {});
});

//Middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.use(passport.initialize())
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(addLogger)

//Routes
app.use("/static", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/public"));
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);
app.use('/user/', routerUser)
app.use('/api/session/', routerSession)
app.use('/mockingproducts',routerMocking)
app.use("/loggerTest",routerLogger)



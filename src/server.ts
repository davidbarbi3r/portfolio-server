import { config } from './config/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './library/Logging';
import postRoutes from "./routes/Post"
import userRoutes from "./routes/User"

const router = express();

// Connection to database
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info(`Connected to MongoDb`);
        StartServer();
    })
    .catch((error) => {
        Logging.error('Cannot connect');
        Logging.error(error);
    });

// If connection is ok

const StartServer = () => {
    router.use((req, res, next) => {
        //Logging request
        Logging.info(`Incomming => Method: [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}]`);

        //Logging response
        res.on("finish", () => {
            Logging.info(`Incomming => Method: [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}] - status: [${res.statusCode}]`)
        })

        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // API rules
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Resquested-With, Content-Type, Accept, Authorization');

        if ((req.method == 'OPTIONS')) {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Routes
    router.use("/posts", postRoutes)
    router.use("/users", userRoutes)

    // Healthcheck
    router.get('/miaou', (req, res, next) => res.status(200).json({ tikiton: 'mawouuu' }));

    // Error handling
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};



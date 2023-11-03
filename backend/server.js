import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectMongoose } from './util/connectMongoose.js';
import generalRouter from './routes/generalRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import reservationRouter from './routes/reservationRoutes.js';
import userRouter from './routes/userRoutes.js';
import multerRouter from './routes/multerRoutes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:4444', 'http://localhost:5173', 'https://hotelreservierung.onrender.com/'],
    credentials: true,
  })
);
const PORT = process.env.PORT || 3000;

app.use('/api', roomRouter);
app.use('/api', reservationRouter);
app.use('/api', userRouter);
app.use('/api', multerRouter);
app.use('/api', generalRouter);

app.use('/', express.static('./frontend'));
app.get('/*', (req, res) => res.sendFile('/frontend/index.html', { root: process.env.PWD }));

const connected = await connectMongoose();

if (connected) {
  app.listen(PORT, () => {
    console.log(`Verbunden an Port ${PORT}`);
  });
} else {
  console.error('Verbindung zu mongodb nicht möglich.');
}

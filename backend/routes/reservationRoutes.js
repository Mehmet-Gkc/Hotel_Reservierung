import { Router } from 'express';

import { getReservations, getReservation, addReservation, updateReservation, deleteReservation } from '../controller/reservationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const reservationRouter = Router();

reservationRouter
  .get('/reservations', getReservations) // Get All Reservations
  .get('/reservations/:id', getReservation) // Find Reservation
  .post('/reservations/:id', authMiddleware, addReservation) // Add Reservation
  .put('/reservations/:id', authMiddleware, updateReservation) // Update Reservation
  .delete('/reservations/:id', authMiddleware, deleteReservation); // Delete Reservation

export default reservationRouter;

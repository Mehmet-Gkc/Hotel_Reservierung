import { Router } from 'express';

import { getRooms, getRoom, addRoom, updateRoom, deleteRoom } from '../controller/roomController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const roomRouter = Router();

roomRouter
  .get('/rooms', getRooms) // Get All Rooms
  .get('/rooms/:id', getRoom) // Find Room
  .post('/rooms', authMiddleware, addRoom) // Add Room
  .put('/rooms/:id', authMiddleware, updateRoom) // Update Room
  .delete('/rooms/:id', authMiddleware, deleteRoom); // Delete Room

export default roomRouter;

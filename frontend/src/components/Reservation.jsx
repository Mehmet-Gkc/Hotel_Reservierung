import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';

const initialForm = {
  guestName: '',
  room: '',
  checkInDate: '',
  checkOutDate: '',
};

const Reservation = () => {
  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchReservations();
    }
  }, [isLoggedIn]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`/api/reservations/${loggedInUser._id}`);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedReservation) {
      await handleUpdateSubmit();
    } else {
      try {
        if (isLoggedIn) {
          const response = await axios.post(`/api/reservations/${loggedInUser._id}`, formData);
          console.log('Reservation added:', response.data);
          setFormData(initialForm);
          fetchReservations();
        }
      } catch (error) {
        console.error('Error adding reservation:', error);
      }
    }
  };

  const handleUpdate = (reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      guestName: reservation.guestName,
      room: reservation.room,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(`/api/reservations/${selectedReservation._id}`, formData);
      setFormData(initialForm);
      setSelectedReservation(null);
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reservations/${id}`);
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <Container className='container'  sx={{ marginTop: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h3" gutterBottom>
          {selectedReservation ? 'Update Reservation' : 'Add Reservation'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Guest Name"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            margin="dense"
            variant="outlined"
            required
          />

          <InputLabel htmlFor="room">Room Type</InputLabel>
          <Select
            fullWidth
            labelId="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            margin="dense"
            variant="outlined"
            required
          >
            <MenuItem value="">
              <em>Select a room</em>
            </MenuItem>
            {rooms.map((room) => (
              <MenuItem key={room._id} value={room._id}>
                {room.roomType}
              </MenuItem>
            ))}
          </Select>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <InputLabel htmlFor="checkInDate">Check-in Date</InputLabel>
              <TextField
                fullWidth
                name="checkInDate"
                type="date"
                value={formData.checkInDate}
                onChange={handleChange}
                margin="dense"
                variant="outlined"
                required
              />
            </div>
            <div>
              <InputLabel htmlFor="checkOutDate">Check-out Date</InputLabel>
              <TextField
                fullWidth
                name="checkOutDate"
                type="date"
                value={formData.checkOutDate}
                onChange={handleChange}
                margin="dense"
                variant="outlined"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="contained" color="primary">
            {selectedReservation ? 'Update Reservation' : 'Add Reservation'}
          </Button>
        </form>
      </Paper>
      <div>
        <Typography variant="h5" gutterBottom className="reservation-title">
          Reservations
        </Typography>
        {isLoggedIn &&
          reservations.map((reservation) => (
            <Card  key={reservation._id} elevation={3} sx={{ marginTop: 2 }}>
              <CardContent >
                <Typography variant="body1" className="guestName">
                  
                  <p>
                    <strong>Guest Name:</strong>
                    <br />
                    {reservation.guestName}
                  </p>
                  <p>
                    <strong>Room Type:</strong>
                    <br />
                    {rooms.find((item) => item._id === reservation.room)?.roomType}
                  </p>
                  <p>
                    <strong>Check-in Date:</strong>
                    <br />
                    {new Date(reservation.checkInDate).toLocaleDateString('en-GB')}
                  </p>
                  <p>
                    <strong>Check-out Date:</strong>
                    <br />
                    {new Date(reservation.checkOutDate).toLocaleDateString('en-GB')}
                  </p>
                  <CardActions>
                    <Button onClick={() => handleUpdate(reservation)} variant="outlined" color="primary">
                      Update
                    </Button>
                    <Button onClick={() => handleDelete(reservation._id)} variant="outlined" color="secondary">
                      Delete
                    </Button>
                  </CardActions>
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Reservation;

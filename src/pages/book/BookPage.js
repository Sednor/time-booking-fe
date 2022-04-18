import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import BookCard from '../../components/book/BookCard/BookCard';
import BookSuccessCard from '../../components/book/BookSuccessCard/BookSuccessCard';
import Alert from '../../components/shared/Alert/Alert';

import { book } from '../../services/bookService';

import { BOOKING_STAGES } from '../../constants/book';
import ROUTES from '../../constants/routes';

import './BookPage.css';

const BookPage = () => {
  const navigate = useNavigate();

  const [bookingStage, setBookingStage] = useState(BOOKING_STAGES.INITIAL);
  const [bookingData, setBookingData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (data) => {
    setBookingStage(BOOKING_STAGES.LOADING);
    setBookingData(data);

    try {
      await book(data);
      setBookingStage(BOOKING_STAGES.COMPLETED);
    } catch (e) {
      console.error(e);
      setBookingStage(BOOKING_STAGES.INITIAL);
      setShowAlert(true);
    }
  };

  const handleBookMore = () => {
    setBookingData(null);
    setBookingStage(BOOKING_STAGES.INITIAL);
  };

  const handleViewAll = () => {
    navigate(ROUTES.DB);
  };

  const renderPage = () => {
    switch (bookingStage) {
      case BOOKING_STAGES.INITIAL:
        return (
          <BookCard
            onSubmit={handleSubmit}
          />
        );
      case BOOKING_STAGES.LOADING:
        return (
          <CircularProgress/>
        );
      case BOOKING_STAGES.COMPLETED:
        return (
          <BookSuccessCard
            data={bookingData}
            onBookMore={handleBookMore}
            onViewAll={handleViewAll}
          />
        );
    }
    return (
      <BookCard/>
    );
  };

  return (
    <div className='book-page'>
      {renderPage()}
      <Alert
        variant='error'
        message='Oops! Something went wrong!'
        open={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default BookPage;

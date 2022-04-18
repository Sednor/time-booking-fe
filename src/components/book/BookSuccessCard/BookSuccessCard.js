import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

import { formatDate } from '../../../utils/formatters';

const BookSuccessCard = ({ data, onBookMore, onViewAll }) => {
  const handleBookMore = () => {
    onBookMore();
  };

  const handleViewAll = () => {
    onViewAll();
  };

  const renderContent = () => {
    return (
      <>
        <Typography>
          You have successfully booked for <b>{formatDate(data.dateTime)}</b> the following services:
        </Typography>
        <List>
          {
            data.services.map(service => (
              <ListItem>
                <Typography>
                  {service.serviceName}
                </Typography>
              </ListItem>
            ))
          }
        </List>
        <Typography>
          Confirmation has been sent to <b>{data.email}</b>
        </Typography>
      </>
    );
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        title='Success!'
      />
      <CardContent>
        {
          !!data && renderContent()
        }
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
        <Button
          onClick={handleViewAll}
        >
          View All
        </Button>
        <Button
          onClick={handleBookMore}
          variant='outlined'
        >
          Book More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookSuccessCard;

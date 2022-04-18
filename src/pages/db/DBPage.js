import React, { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { fetchData } from '../../services/dbService';
import { formatDate } from '../../utils/formatters';
import { calculateLeadQualityScore } from '../../utils/utils';
import ROUTES from '../../constants/routes';

import './DBPage.css';

const DBPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(res => {
      setData(res.data.content);
    });
  }, []);

  const handleBackToBooking = () => {
    navigate(ROUTES.BOOK);
  };

  const renderRow = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell>
          {item.email}
        </TableCell>
        <TableCell>
          {formatDate(item.createdDate)}
        </TableCell>
        <TableCell>
          {formatDate(item.dateTime)}
        </TableCell>
        <TableCell>
          {item.services.map(item => item.serviceName).join(', ')}
        </TableCell>
        <TableCell>
          {item.time}s
        </TableCell>
        <TableCell>
          {calculateLeadQualityScore(item.time)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className='db-page'>
      <Button onClick={handleBackToBooking}>
        Back to booking
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Date / Time</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>Time to Complete</TableCell>
              <TableCell>LQS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => renderRow(row))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DBPage;

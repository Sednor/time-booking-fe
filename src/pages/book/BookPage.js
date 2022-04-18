import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';

import { validateEmail } from '../../utils/validators';
import { SERVICES } from '../../constants/data';

import './BookPage.css';
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BookPage = () => {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [services, setServices] = useState([]);

  const [emailError, setEmailError] = useState('');
  const [serviceError, setServiceError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChange = (value) => {
    setDateTime(value);
  };

  const handleServiceChange = (e) => {
    const {
      target: { value },
    } = e;
    setServices(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const validate = () => {
    let isValid = true;

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!services || !services.length) {
      setServiceError('Please select at least one service');
      isValid = false;
    } else {
      setServiceError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValid = validate();

    if (!isValid) {
      return;
    }

    const data = {
      email,
      dateTime,
      services,
    };
    console.log(data);
  };

  const renderChip = (item) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {item.map((value) => (
          <Chip
            key={value}
            label={value}
            size='small'
          />
        ))}
      </Box>
    );
  };

  const renderServiceItem = (serviceName) => {
    const style = {
      fontWeight:
        services.indexOf(serviceName) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };

    return (
      <MenuItem
        key={serviceName}
        value={serviceName}
        style={style}
      >
        {serviceName}
      </MenuItem>
    );
  };

  return (
    <div className='book-page'>
      <Card sx={{ width: 400 }}>
        <CardHeader
          title='Time Booking'
          subheader='Book time & service'
        />
        <CardContent>
          <Stack direction='column' spacing={3}>
            <TextField
              label='Email'
              variant='outlined'
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label='Date&Time picker'
                value={dateTime}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl error={!!serviceError}>
              <InputLabel>Service</InputLabel>
              <Select
                multiple
                value={services}
                onChange={handleServiceChange}
                input={<OutlinedInput label='Service'/>}
                renderValue={(item) => renderChip(item)}
                MenuProps={MenuProps}
              >
                {SERVICES.map((name) => renderServiceItem(name))}
              </Select>
              {
                !!serviceError && (
                  <FormHelperText error>{serviceError}</FormHelperText>
                )
              }
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions sx={{ flexDirection: 'row-reverse', padding: '16px' }}>
          <Button
            onClick={handleSubmit}
            variant='outlined'
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default BookPage;
import React from 'react';
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

import './BookPage.css';

const servicesList = [
  'Service A',
  'Service B',
  'Service C',
  'Service D',
  'Service E',
];

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

function getStyles(name, service, theme) {
  return {
    fontWeight:
      service.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const BookPage = () => {
  const theme = useTheme();

  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [services, setServices] = React.useState([]);

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setServices(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className='book-page'>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <div className='card-content'>
            <TextField label='Email' variant='outlined'/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label='Date&Time picker'
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Chip</InputLabel>
              <Select
                multiple
                value={services}
                onChange={handleServiceChange}
                input={<OutlinedInput label='Chip'/>}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value}/>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {servicesList.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, services, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </CardContent>
        <CardActions>
          <Button>Submit</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default BookPage;

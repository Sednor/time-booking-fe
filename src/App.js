import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import BookPage from './pages/book/BookPage';
import DBPage from './pages/db/DBPage';

import routes from './constants/routes';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='app'>
        <Routes>
          <Route exact path={routes.BOOK} element={<BookPage/>}/>
          <Route exact path={routes.DB} element={<DBPage/>}/>
          <Route
            path='*'
            element={<Navigate to={routes.BOOK} replace/>}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertRef = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Alert = (props) => {
  const { open, onClose, variant, message, vertical = 'bottom', horizontal = 'center' } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <AlertRef onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
        {message}
      </AlertRef>
    </Snackbar>
  );
};

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  message: PropTypes.string,
  vertical: PropTypes.oneOf(['top', 'bottom']),
  horizontal: PropTypes.oneOf(['left', 'center', 'right'])
};

export default Alert;

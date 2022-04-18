import moment from 'moment';

const DATE_FORMAT = 'MMM D, YYYY HH:mm a';

export const formatDate = (date) => {
  if (!date) {
    return '';
  }

  return moment(date).format(DATE_FORMAT);
};

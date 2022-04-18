import moment from 'moment';

const DATE_FORMAT = 'MMM D, YYYY HH:mm a';

export const formatDate = (date) => {
  if (!date) {
    return '';
  }

  const timezoneOffset = new Date().getTimezoneOffset();
  return moment(date).subtract(timezoneOffset, 'm').format(DATE_FORMAT);
};

import moment from 'moment';

const DATE_FORMAT = 'MMM D, YYYY HH:mm a';

export const formatDate = (date, localTime = true) => {
  if (!date) {
    return '';
  }

  const timezoneOffset = localTime ? new Date().getTimezoneOffset() : 0;
  return moment(date).subtract(timezoneOffset, 'm').format(DATE_FORMAT);
};

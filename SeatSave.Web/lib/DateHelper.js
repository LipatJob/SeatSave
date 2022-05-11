import moment from 'moment';

function formatTime(time) {
  return moment(`1111-11-11T${time}`).format('h:mm a');
}

function formatDate(date, showYear = true) {
  return moment(date).format(`MMMM D${showYear ? ', YYYY' : ''}`);
}

export { formatTime, formatDate };

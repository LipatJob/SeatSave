const monthsList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// accepts time format: "07:00" or "07:00:00"
function convertTimeFormat(timeString) {
  const hour = parseInt(timeString.slice(0, 2), 10);
  const minute = parseInt(timeString.slice(3, 5), 10);
  let time = `${hour > 12 ? hour - 12 : hour}`;
  if (hour === 0) time = '12';
  time += (minute < 10 ? ':0' : ':') + minute;
  time += hour >= 12 ? ' pm' : ' am';
  return time;
}

// accepts date format: "2022-04-28"
function convertDateFormat(dateString) {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  const monthIndex = parseInt(month, 10) - 1;
  const date = `${monthsList[monthIndex]} ${day}, ${year}`;
  return date;
}

// accepts datetime format: "2022-04-28T08:02:00"
function convertDateTimeFormat(dateTimeString) {
  const time = convertTimeFormat(dateTimeString.slice(11, 16));
  const date = convertDateFormat(dateTimeString.slice(0, 10));
  const dateTime = `${time} - ${date}`;
  return dateTime;
}

export default {
  convertTimeFormat,
  convertDateFormat,
  convertDateTimeFormat,
};

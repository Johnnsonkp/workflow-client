export function calculateWeek(date){
    const newDays = new Array();
    for (let i = 0; i < 7; i++){
      newDays[i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i);
    }
    return newDays
}

export function calculateYear(date){
  const newDays = new Array();
  for (let i = 0; i < 365; i++){
    newDays[i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i);
  }
  return newDays
}

export function calculateMonth(date, lastDateOfMonth){
  const newDays = new Array();
  for (let i = 0; i <= lastDateOfMonth; i++){
    newDays[i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i);
  }
  return newDays
}

export const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDateTimeValue = (calendarInput) => {
  let dateString = calendarInput
  let date = new Date(dateString);
  var yyyy = calendarInput.getFullYear();
  var mm = calendarInput.getMonth() + 1; // Months start at 0!
  var dd = calendarInput.getDate();
  if (dd < 10) dd = 0 + dd.toString()
  if (mm < 10) mm = 0 + mm.toString();
  let formattedToday = yyyy + '-' + mm + '-' + dd
  return formattedToday?.toString()
}

export const reformatDateInput = (dateStr) => {
  let newDateToString = dateStr.toString()
  
  let parts = newDateToString?.split("-");
  let monthNum = parseInt(parts[1]) - 1
  let rewrittenDate = parts[2] + '/' + monthsArr[monthNum] + '/' + parts[0];
  
  return rewrittenDate
}
export const numMonth = {
  'January': '01',
  'February': '02',
  'March': '03',
  'April': '04',
  'May': '05',
  'June': '06',
  'July': '07',
  'August': '08',
  'September': '09',
  'October': '10',
  'November': '11',
  'December': '12'
}
export function calculateWeek(date){
    const newDays = new Array();
    for (let i = 0; i < 7; i++){
      newDays[i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i);
    }
    return newDays
}
export const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
export const monthDisplayDateComparision = (MonthDisplay, index, numMonth) => {
    return (Number(MonthDisplay[index]?.date?.toString().replace('0', '')) + Number(numMonth[MonthDisplay[index]?.month]?.toString().replace('0', ''))) 
}

export const entryDisplayDateComparision = (entry) => {
    return (Number(entry.date.replace('/', '').slice(0, 2).replace('0', '')) + (Number(entry.date.replace('/', '').slice(2, 3)) > 0? Number(entry.date.replace('/', '').slice(2, 3)) : 
    Number(entry.date.replace('/', '').slice(3, 4)) )) 
}

export const reformatDate = (inputDate) => {
    // let inputDate = "3/August/2024";
    if(!inputDate || typeof(inputDate) !== 'string'){
        return
    }

    // Split the input date into parts
    let [day, monthName, year] = inputDate.split('/');

    // Convert the month name to a two-digit number
    let monthNumber = new Date(Date.parse(monthName + " 1, 2024")).getMonth() + 1;
    let month = monthNumber < 10 ? '0' + monthNumber : monthNumber.toString();

    // Shorten the year to two digits
    let shortYear = year.slice(-2);

    // Combine the parts into the new format
    let outputDate = `${day}/${month}/${shortYear}`;


    return outputDate
}
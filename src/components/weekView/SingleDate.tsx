import React from 'react'
import { Text } from '@mantine/core';
var today = new Date();
var yyyy = today.getFullYear();
var mm = today.getMonth() + 1; // Months start at 0!
var dd = today.getDate();
const todaysDate = today.getDate();
const day = today.getDay()

if (dd < 10) dd = 0 + dd;
if (mm < 10) mm = 0 + mm;
var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var formattedToday = days[day] + ',' + ' ' + dd + ' ' + months[mm] + ' ' + yyyy;

function SingleDate() {
  return (
    <Text className={'text-center'} fw={300} my='auto' ml={'7'} fz={'sm'}>{formattedToday}</Text>
  )
}

export default SingleDate
import './DateTimePicker.css'

import React, {useEffect, useState} from 'react'

import { DateTimePicker } from '@mantine/dates';
import { useRef } from 'react';

interface Props {
    setValue: Date | string;
}

const DateTimePickerCus: React.FC<Props> = ({setValue}) => {
  const todaysDate = new Date()
  const ref = useRef<HTMLButtonElement>(null);
  const [ddmmyyyy, setDdmmyyyy] = useState<Date | string | undefined>(null)
  const [hhMinute, setHhMinute] = useState<Date | string | undefined>(null)

  const getDateTimeValue = (calendarInput: any) => {
    let dateString = calendarInput
    let date = new Date(dateString);
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Month is zero-based, so we add 1
    let dd = date.getDate();

    let hh = date.getHours();
    let minute = date.getMinutes();

    // console.log("dd/mm/yyyy:", dd + '/' + mm + '/' +yyyy)
    setDdmmyyyy(dd + '/' + mm + '/' +yyyy)
    setHhMinute(hh + ':' + minute)


    console.log("dd/mm/yyyy:", ddmmyyyy)
    console.log("hhMinute:", hhMinute)

    setValue(ddmmyyyy)
  }

  useEffect(() => {
    console.log("useEffect dd/mm/yyyy:", ddmmyyyy)
    console.log("useEffect hhMinute:", hhMinute)
  }, [getDateTimeValue])

  
  return (
    <DateTimePicker
        valueFormat="DD/MMMM/YYYY hh:mm A"
        label="Pick date and time"
        placeholder="Pick date and time"
        defaultValue={new Date()}
        variant='filled'
        clearable
        // value={Date}
        ref={ref}
        onChange={(e) => getDateTimeValue(ref.current?.innerText)}
    />
  )
}

export default DateTimePickerCus
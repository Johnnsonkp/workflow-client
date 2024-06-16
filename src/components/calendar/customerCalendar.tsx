import * as React from 'react';

import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';

import { Button } from '@mantine/core';

interface Props {
    isToday: boolean,
    isSelected: boolean,
    children: number | string; 
    index: number;
    onClick: () => void
}

const Frame = styled.div`
  width: 230px;
  max-height: 280px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px #eee;
  border-radius: 2px;
`;

const Header = styled.div`
  font-size: 11px;
  font-weight: bold;
  padding: 5px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f6fa;
`;

// const Button = styled.div`
//   cursor: pointer;
// `;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day: React.FC<any> = styled.div<Props >`
  width: 14.2%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 10px;

  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid #eee;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #eee;
      background-color: #60A5FA;
      color: #eee;
    `}
`;

const CXDays: React.FC<Props> = ({isToday, isSelected, onClick, children, index}) => {
  return (
    <div 
      key={index}
      className={`${isToday? 'bg-[#60A5FA] text-[#eee]' : 'bg-[#fff]'} 
        ${isSelected && 'border: 1px solid #eee'}
        w-[14.2%] h-[35px] flex items-center justify-center cursor-pointer text-[10px]  
      `}
      onClick={onClick}>
      {children}             
    </div>
  )
}

export function CustomCalendar() {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date: Date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  return (
    <Frame>
      <Header>
        <Button variant='light' color='#333' size='xs' px={'xs'} py={'xs'} onClick={() => setDate(new Date(year, month - 1, day))}>Prev</Button>
        <div>
          {MONTHS[month]} {year}
        </div>
        <Button variant='light' color='#333' size='xs' fz={'xs'} px={'xs'} py={'xs'} onClick={() => setDate(new Date(year, month + 1, day))}>Next</Button>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map((d) => (
          <Day key={d}>
            <strong className='!text-[9px]'>{d}</strong>
          </Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <CXDays
                key={index}
                index={index}
                isToday={d === today.getDate()}
                isSelected={d === day}
                onClick={() => setDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ''}
              </CXDays>
            );
          })}
      </Body>
    </Frame>
  );
}

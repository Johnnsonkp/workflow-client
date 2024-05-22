import { ActionIcon, Anchor, Avatar, Badge, Checkbox, Group, Pagination, Table, Text, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import React, {MouseEvent, useEffect, useState} from 'react'

function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }
  
  const data = chunk(
    Array(30)
      .fill(0)
      .map((_, index) => ({ id: index, task: taskObj || "hello" })),
    7
  );

  const [activePage, setPage] = useState(1);

  const paginationCount =  Math.ceil(taskObj.length / 7) 

  const items = data[activePage - 1].map((item) => (
    item.task[item.id] &&
      <ListViewSingle key={item.id} task={item.task[item.id]} taskStatus={taskStatus} handleDeleteTask={handleDeleteTask }/> 
  ));
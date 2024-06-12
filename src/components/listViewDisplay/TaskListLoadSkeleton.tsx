import { Skeleton, Table } from '@mantine/core'

import React from 'react'

const TaskListLoadSkeleton = () => {
    return <Table.Tbody className='absolute m-[auto] py-3 px-3'>
      <Skeleton height={40} radius="sm" width={'80vw'}/>
      <Skeleton height={40} mt={8} radius="sm" />
      <Skeleton height={40} mt={8} radius="sm" />
      <Skeleton height={40} mt={8} radius="sm" />
    </Table.Tbody>
}

export default TaskListLoadSkeleton
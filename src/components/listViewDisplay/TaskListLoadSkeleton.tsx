import { Grid, Skeleton } from '@mantine/core'

const TaskListLoadSkeleton = () => {
      // return <Grid className='absolute m-[auto] py-3 px-3'>
      // <Skeleton height={40} radius="sm" width={'80vw'}/>
      // <Skeleton height={40} mt={8} radius="sm" />
      // <Skeleton height={40} mt={8} radius="sm" />
      // <Skeleton height={40} mt={8} radius="sm" />
      // </Grid>

      return <>
      <Skeleton height={40} radius="sm" width={'80vw'}/>
      <Skeleton height={40} mt={8} radius="sm" />
      <Skeleton height={40} mt={8} radius="sm" />
      <Skeleton height={40} mt={8} radius="sm" />
      </>
}

export default TaskListLoadSkeleton
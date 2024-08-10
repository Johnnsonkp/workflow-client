import {Skeleton} from '@mantine/core'

interface Props {
  lines?: number;
}

const TaskListLoadSkeleton: React.FC<Props> = ({lines}) => {
  const LinesToLoad = () => {
    let obj: any = []
    for(let i = 1; i < lines; i++){
      obj.push(<Skeleton height={40} mt={6} mb={2} radius="sm" width={'80vw'}/> )
    }
    return obj
  }

  const DefaultLines = () => {
    return( 
      <>
        <Skeleton height={40} mt={8} radius="sm" width={'80vw'}/>
        <Skeleton height={40} mt={8} radius="sm" width={'80vw'}/>
        <Skeleton height={40} mt={8} radius="sm" width={'80vw'}/>
        <Skeleton height={40} mt={8} radius="sm" width={'80vw'}/>
      </>
    )
  }

  return(
    lines? <LinesToLoad /> : <DefaultLines />
  )
}

export default TaskListLoadSkeleton


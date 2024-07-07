import { ActionIcon, Group, Table, rem } from '@mantine/core'
import { IconArchive, IconPencil, IconTrash } from '@tabler/icons-react'

function ListActionsComp({task, taskObj, toggleTaskArchive, handleDeleteTask}) {
  return (
    <Table.Td className='w-13'>
        <Group gap={0} justify="flex-end">
          <ActionIcon onClick={() => toggleTaskArchive(task)} variant="subtle" 
            color={`${task.number? 'blue' : 'gray'}`}>
            <IconArchive style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteTask(taskObj)} >
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
  )
}

export default ListActionsComp
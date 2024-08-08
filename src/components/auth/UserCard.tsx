import { Avatar, Text, rem } from '@mantine/core';
import { Card, Grid, Progress, SimpleGrid } from '@mantine/core';

import classes from './userCard.module.css'
import { getItemFromLocalStorage } from '../../utils/localstorage';
import { mockUser } from '../../utils/mockData';
import { useAppState } from '../../store/AppState';
import { useNavigate } from 'react-router-dom';

const AVATAR_HEIGHT = rem(130);

export function UserInfoAction() {
    const {state} = useAppState()
    const navigate = useNavigate()
    const userData = state.userAuthStatus.isUserLoggedIn && state.user || getItemFromLocalStorage('AUTH')
    const parsedUserData = userData || mockUser  

    const NavigateToUserPage = () => {
        return navigate("/userxp")
    }

    let completedTasksCount = state.tasks?.filter? state.tasks?.filter((task) => task.status === 'complete').length : 0;
    
    return (
     <Card  my="" pl={0} pr={10} pb={9} radius="md"
        className={`${classes.card} bg-[#F9FAFA]`} 
        onClick={() => NavigateToUserPage()}
     >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="" className='pt-0 pb-1'>
            <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                size={AVATAR_HEIGHT}
                radius={120}
                mx="auto"
            />
            <Grid gutter="sm">
                <Grid.Col>

                    <div className='bg-[#F9FAFA] p-1 rounded-sm'>
                        <Text ta="left" fz="lg" fw={500} mt="">
                            {parsedUserData.username || 'Jane Fingerlicker' }
                        </Text>
                        <Text ta="left" fz="sm" fw={400} mt="">
                            User Level / User XP
                        </Text>
                    </div>
                    
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text ta="left" fz="xs" fw={400} mt="" className='bg-[#F9FAFA] mt-1 rounded-sm !p-1'>
                        Task Created {state.tasks?.length || 0 }
                    </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text ta="left" fz="xs" fw={400} mt="" className='bg-[#F9FAFA] mt-1 rounded-sm !p-1'>
                        <p>Completed </p>
                        <p>{completedTasksCount}</p>
                    </Text>
                </Grid.Col>

                <Grid.Col span={12} className=''>
                    <Progress value={completedTasksCount / state.tasks?.length * 100} mt="" size="md" radius="xl" /> 
                </Grid.Col>
            </Grid>
        </SimpleGrid>
     </Card>
    );
}

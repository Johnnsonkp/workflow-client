import { Avatar, Button, Center, Group, Paper, RingProgress, Text, rem } from '@mantine/core';
import { Container, Grid, Progress, SimpleGrid, Skeleton } from '@mantine/core';

import classes from './userCard.module.css'
import { getItemFromLocalStorage } from '../../utils/localstorage';
import { mockUser } from '../../utils/mockData';
import { useAppState } from '../../store/AppState';
import { useNavigate } from 'react-router-dom';

const PRIMARY_COL_HEIGHT = rem(150);
const AVATAR_HEIGHT = rem(130);

export function UserInfoAction() {
    const {state, dispatch} = useAppState()
    const navigate = useNavigate()
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
    const userData = state.userAuthStatus.isUserLoggedIn && state.user || getItemFromLocalStorage('AUTH')
    const parsedUserData = userData || mockUser  

    const NavigateToUserPage = () => {
        return navigate("/userxp")
    }
    
    return (
     <Container my="" pl={0} pr={10} pb={9} className='bg-[#F9FAFA] rounded-lg' onClick={() => NavigateToUserPage()}>
        {/* <a href="/userxp"> */}
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="" className='pt-3 pb-1'>
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
                            Completed {state.tasks?.filter((task) => task.status === 'complete'  ).length || 0}
                        </Text>
                    </Grid.Col>

                    <Grid.Col span={12} className=''>
                        <Progress value={34.31} mt="xs" size="md" radius="xl" /> 
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        {/* </a> */}
     </Container>
    );
}
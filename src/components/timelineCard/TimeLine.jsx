import { Button, Card, Group, Modal, Paper, Text, Timeline } from '@mantine/core';
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots } from '@tabler/icons-react';
import React, {useEffect, useState} from 'react'

import { useAppState } from '../../store/AppState';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

function TimeLineCardDIsplay() {
    const [toggleForm, setToggleForm] = useState(false)
    const [dispatchMonthy, setDispatchMonthly] = useState(true)
    const [opened, { open, close }] = useDisclosure(toggleForm);
    const {dispatch} = useAppState()
    const navigate = useNavigate()
    
    const [monthlyGoals, setMonthlyGoals] = useState([ 
        {title: 'Complete Productivity App', complete: true }, 
        {title:'Begin shopify dev freelancing',complete: false }, 
        {title: "Beging making dev content", complete: false }
    ])

    const [monthly_1, setMonthly_1] = useState(monthlyGoals[0].title)
    const [monthly_2, setMonthly_2] = useState(monthlyGoals[1].title)
    const [monthly_3, setMonthly_3] = useState(monthlyGoals[2].title)

    const handleFormSubmit = () => {
        setToggleForm(close)
        setMonthlyGoals([ 
          {title: monthly_1, complete: false},
          {title: monthly_2, complete: false},
          {title: monthly_3, complete: false}
        ])

        // dispatch({type: 'SET_MONTHLY', payload: monthlyGoals})
    }

    return (
        <>
            {/* <Paper onClick={() => navigate('/monthly')} withBorder radius="sm" p="xs" key={1} 
                className='!shadow-md h-[88%] !bg-[#F9FAFA] cursor-pointer'> */}
            <Paper onMouseDown={open} onClose={close} radius="" p="xs" key={1} 
                className='!shadow-md h-[88%] !bg-[#F9FAFA] cursor-pointer'>
                <Group className='!justify-center !align-end'>
                    <Timeline active={0} bulletSize={22} lineWidth={2} className=' w-[95%]' mb="sm" pt='lg'>
                        {/* <button onMouseDown={open} onClose={close}>CLick Me</button> */}
                        <Timeline.Item size={'sm'} 
                            bullet={<IconGitBranch size={10} />} fz="sm" 
                            title={monthlyGoals[0].title}>
                        </Timeline.Item>

                        <Timeline.Item 
                            bullet={<IconGitCommit size={10} />} fz="sm" 
                            title={monthlyGoals[1].title}>
                        </Timeline.Item>

                        <Timeline.Item fz="sm" 
                            title={monthlyGoals[2].title} 
                            bullet={<IconGitPullRequest size={10} />} lineVariant="dashed">
                        </Timeline.Item>

                    </Timeline> 
                </Group>
            </Paper>

            <Modal 
                opened={opened} 
                onClose={close} 
                centered 
                fullScreen={false} 
                size="550px"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}  
            > 
                <Card withBorder radius="md" p="md" className={``} pb="">
                    Add Daily Stand Up
                    <div className={` flex-col mt-3`}>
                        <form>
                            <Timeline active={0} bulletSize={22} lineWidth={2} className=' w-[95%]' mb="sm" pt='lg'>
                                <Group 
                                    // className='flex'
                                    wrap="nowrap"
                                    gap="xs"
                                    justify="space-around" 
                                >
                                    {/* <label>1.</label> */}
                                    <Timeline.Item 
                                        size={'md'} 
                                        bullet={<IconGitBranch size={12} />} fz="md" 
                                        w={'100%'}
                                    >
                                        <input 
                                            defaultValue={monthlyGoals[0].title}
                                            className='w-[100%]'
                                            bullet={<IconGitBranch size={10} />} 
                                            onChange={(e) => setMonthly_1(e.target.value)}
                                        ></input>
                                    </Timeline.Item>
                                </Group>  
                                <Group justify="space-around" wrap="nowrap" gap="xs">
                                    {/* <label>2.</label> */}
                                    <Timeline.Item 
                                        size={'md'} 
                                        bullet={<IconGitBranch size={12} />} fz="md" 
                                        w={'100%'}
                                    >
                                        <input 
                                            defaultValue={monthlyGoals[1].title}
                                            className='w-[100%]'
                                            bullet={<IconGitBranch size={10} />}
                                            onChange={(e) => setMonthly_2(e.target.value)} 
                                        ></input>
                                    </Timeline.Item>
                                </Group>  
                                <Group justify="space-around" wrap="nowrap" gap="xs">
                                    {/* <label>3.</label> */}
                                    <Timeline.Item 
                                        size={'md'} 
                                        bullet={<IconGitBranch size={12} />} fz="md" 
                                        w={'100%'}
                                    >
                                        <input 
                                            defaultValue={monthlyGoals[0].title}
                                            className='w-[100%]'
                                            bullet={<IconGitBranch size={10} />}
                                            onChange={(e) => setMonthly_3(e.target.value)} 
                                        ></input>
                                    </Timeline.Item>
                                </Group> 
                            </Timeline>
                        </form>
                    </div>
                    <div className='mt-4 w-[100%]'>
                        <hr className='mb-5'></hr>
                        <Button onClose={close} className='!w-[100%]' 
                            onClick={() => {handleFormSubmit()}}
                        >
                            Save
                        </Button>
                    </div>
                </Card>

            </Modal>
        </>
    );   
}

export default TimeLineCardDIsplay
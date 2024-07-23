import { Button, Group, SimpleGrid, TextInput, Textarea, Title } from '@mantine/core';

import { habitFormActions } from '../../actions/habitActions';
import { useAppState } from '../../store/AppState';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export function HabitForm() {
    const navigate = useNavigate()
    const {state} = useAppState()

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            current_streak: 0,
            complete: false,
        },
        validate: {
          title: (value) => value.trim().length < 2,
        },
    });

    const handleFormSubmit = async (form) => {
        console.log("form Data:", form.values)

        const creatAction = await habitFormActions['create']
        creatAction(form.values, state.user).then((data) => {
            console.log("Data:", data)
            navigate('/habits')
        })
    }


    return(
        <form 
            className='flex-row items-center justify-center bg-white m-auto rounded-md px-7'
            onSubmit={form.onSubmit(() => handleFormSubmit(form))}
        >
            <Title
                order={2}
                size="h2"
                style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                fw={600}
                ta="left"
             >
                Add New Habit
            </Title>
            <hr className='mt-2'></hr>
            
            <SimpleGrid cols={{ base: 1, sm: 2, md: 1 }} mt="md">
                <TextInput
                    label="Habit Name"
                    placeholder="Habit Name"
                    name="title"
                    variant="filled"
                    size='md'
                    {...form.getInputProps('title')}
                />
                <Textarea
                    mt="md"
                    label="Description"
                    placeholder="Task Description"
                    maxRows={10}
                    minRows={3}
                    autosize
                    size='md'
                    name="description"
                    variant="filled"
                    {...form.getInputProps('description')}
                />
            </SimpleGrid>
            <hr className='mt-7'></hr>
            <Group justify="right" mt="xl">
                <Button type="submit" size="sm" onClick={() => navigate('/habits')}>
                    Cancel
                </Button>
                <Button type="submit" size="sm">
                    Create
                </Button>
            </Group>
        </form>
    )
}
import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, SegmentedControl, SimpleGrid, Text, TextInput } from '@mantine/core';
import React, {useEffect, useState} from 'react'

import { IconLoader } from '@tabler/icons-react'
import { Link } from 'react-router-dom';
import classes from './LandingAuth.module.css';
import { storeUserData } from '../../actions/userActions';
import { useAppState } from '../../store/AppState';
import { useForm } from '@mantine/form';
import { userFormActions } from '../../actions/userActions';

function AuthForm({setUserData}) {
 const [section, setSection] = useState('Log in');
 const [btnDisplay, setBtnDisplay] = useState(null);
 const {state, dispatch} = useAppState()
 const [loginSuccess, setLoginSuccess] = useState()

const formActionData = {
  "Sign up": { formAction: 'signup', action: 'SIGNUP_SUCCESS'},
  "Log in": { formAction: 'login', action: 'LOGIN_SUCCESS' }
}

 async function handleSubmit(values) {
    let action = formActionData[section].formAction
    const loadAction = await userFormActions[action];
    
    loadAction(values).then((data) => {
      if (data && !data.error) {
        storeUserData(data, dispatch, formActionData[section].action)
        setUserData(data);
        setLoginSuccess(true)
      } else {
        location.reload()
      }
    });

  }

  let demoValues =  {
    username: 'testing123',
    email: 'testing123@gmail.com',
    password: '0000',
  }

  async function handleDemo() {
    let action = formActionData["Log in"].formAction
    const loadAction = await userFormActions[action];
    
    loadAction(demoValues).then((data) => {
      if (data && !data.error) {
        storeUserData(data, dispatch, formActionData["Log in"].action)
        setUserData(data);

      } else {
        console.log(`${data.error} please try again !`);
        alert(`${data.error} please try again !`);
      }
    });

  }

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <form className={classes.form} 
        onSubmit={form.onSubmit(() => {
            console.log("form values", form.values)
            handleSubmit(form.values)
        })}
    >
        
        <div className={classes.title}>
            <SegmentedControl
                value={section}
                onChange={(value) => setSection(value)}
                transitionTimingFunction="ease"
                fullWidth
                data={[
                    { label: 'Log in', value: 'Log in' },
                    { label: 'Sign up', value: 'Sign up' },
                ]}
            />
        </div>

        <div className={classes.fields}>
        <SimpleGrid cols={{ base: 1, sm: 1 }}>
            <TextInput label="Username" placeholder="Your username" 
                {...form.getInputProps('username')}
            />
            <TextInput label="Email" placeholder="e.g. john@example.com" required 
                {...form.getInputProps('email')}
            />
            <PasswordInput label="Password" placeholder="Your password" required  
              {...form.getInputProps('password')}
            />

            <Group justify="space-between" mt="xs">
                <Checkbox label="Remember me" />
                  <Anchor component="button" size="sm">
                    Forgot password?
                  </Anchor>
            </Group>
        </SimpleGrid>

        <Group justify="" mt="lg" classNames="">
            <Button 
                type="submit" 
                className={`${classes.control}`} w={'45%'}
                onClick={() => setBtnDisplay(<IconLoader className='loader ease-linear animate-spin'/>)}    
            > 
            {btnDisplay === null? section : btnDisplay }
            </Button>

            <Button 
                onClick={() => handleDemo()}
                className={`${classes.control} !bg-transparent !text-blue-400 !border !border-blue-400`} w={'50%'}>
                    
              {"Demo mode" || <IconLoader className='loader ease-linear animate-spin'/>}
            </Button>
        </Group>

        <Link to="/personal">Personal Page</Link>
        </div>
    </form>
  )
}

export default AuthForm
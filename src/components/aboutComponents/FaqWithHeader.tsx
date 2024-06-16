import { Avatar, Button, Container, Overlay, SimpleGrid, Text, Title, UnstyledButton } from '@mantine/core';
import React, {useState} from 'react';

import { ContactIconsList } from './ContactIcons';
import classes from './FaqWithHeader.module.css';
import displayPic from '../../assets/aboutPic.png'
import { getItemFromLocalStorage } from '../../utils/localstorage';
import { useAppState } from '../../store/AppState';
import { userFormActions } from '../../actions/userActions';

const categories = [
  {
    label: 'Customer Support',
    image:
      'https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'User Guides',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Sales Questions',
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
];

export function FaqWithHeader() {
  const {state} = useAppState()
  const LSdata = getItemFromLocalStorage('AUTH')
  const [sessionInfo, setSessionInfo] = useState({
    id: '',
    username: '',
    email: '',
    password_digest: ''
  })

  const items = categories.map((category) => (
    <UnstyledButton
      style={{ backgroundImage: `url(${category.image})` }}
      className={classes.categoryCard}
      key={category.label}
    >
      <Overlay color="#000" opacity={0.6} zIndex={1} />
      <Text size="xl" ta="center" fw={700} className={classes.categoryLabel}>
        {category.label}
      </Text>
    </UnstyledButton>
  ));

  const displayUserInfo = async (LSdata) => {
    const loadUserInfo = userFormActions['show']
    const userData = await loadUserInfo(LSdata)

    console.log("userData", userData)
    setSessionInfo(userData)
  }
  

  return (
    <Container className={classes.wrapper} size="lg">
      <div className={classes.header}>
        <div>
          <Title className={classes.title}>Overview</Title>
          <Title className={classes.titleOverlay} role="presentation">
            About
          </Title>
        </div>

        <div className={classes.contact}>
          <div className='flex justify-between mb-4'>
            <Text size="xl" fw={500} className={classes.contactTitle}>
              About
            </Text>
            <Avatar className={classes.pic} size={'xl'} src={displayPic} />
          </div>
          <hr className='mb-4'></hr>

          <ContactIconsList />
        </div>
      </div>
      

      {/* <SimpleGrid cols={{ base: 1, sm: 3 }}>{items}</SimpleGrid> */}
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <Button onClick={() => displayUserInfo(LSdata)}>Load User Info</Button>

        <div className='border border-gray-400 p-3 rounded-sm w-[700px]'>
          {
            sessionInfo && 
              <>
                <div>ID: {sessionInfo.id}</div>
                <div>Username: {sessionInfo.username}</div>
                <div>Email: {sessionInfo.email}</div>
                <div>Password: {sessionInfo.password_digest}</div>
              </>
          }
        </div>
      </SimpleGrid>
    </Container>
  );
}
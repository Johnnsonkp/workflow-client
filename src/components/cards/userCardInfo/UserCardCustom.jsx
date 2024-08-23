import { Badge, Button, Card, Center, Group, Image, Text } from '@mantine/core';

import React from 'react'
import { userSignOut } from '../../../actions/userActions'

function UserCardCustom({state, user, navigate}) {
  const handleSignOut = () => {
    alert("Signing out now, goodbye")
    userSignOut('AUTH')
    window.location.reload()
  }

  return (
    // <div class="flex flex-col justify-center items-center h-[100vh] border border-red-500">
      <div class="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[250px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div class="relative flex h-20 w-full justify-center rounded-xl bg-cover bg-pink-400 bg-[#3a3d8a81]" >
              <div class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <img class="h-full w-full rounded-full" src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png' alt="" />
              </div>
          </div> 
          <div class="mt-10 flex flex-col items-center">
              <h4 class="text-xl font-bold text-navy-700 capitalize dark:text-white">
                {user?.username || " "}
              </h4>
              <p class="text-base font-normal text-gray-600">{user?.email || " "}</p>
          </div> 
          <div class="mt-6 mb-3 flex gap-14 md:!gap-10">
              <div class="flex flex-col items-center justify-center">
                <p class="text-lg font-bold text-navy-700 dark:text-white">{state?.tasks?.length || 0}</p>
                <p class="text-sm font-normal text-gray-600">Tasks</p>
              </div>
              <div class="flex flex-col items-center justify-center">
                <p class="text-lg font-bold text-navy-700 dark:text-white">
                    9
                </p>
                <p class="text-sm font-normal text-gray-600">Habits</p>
              </div>
              <div class="flex flex-col items-center justify-center">
                <p class="text-lg font-bold text-navy-700 dark:text-white">
                    434
                </p>
                <p class="text-sm font-normal text-gray-600">UserXP</p>
              </div>
          </div>

          <Group gap={4} mt="md">
            <div>
              <Button bg={'red'} onClick={ () => handleSignOut()} radius="sm" style={{ flex: 1 }} size='xs'>
                  Signout
              </Button>
            </div>

            <Button onClick={() => navigate("/dashboard")} radius="sm" style={{ flex: 1 }} size='xs'>
              Dashboard
            </Button>
          </Group>
      </div>   
    // </div>
  )
}

export default UserCardCustom


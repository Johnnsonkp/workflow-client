import * as classes from './formButton.module.css'

import React,{useState} from 'react';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface Props {
    setToggleForm: (value: boolean | undefined) => void;
    toggleForm: (value: boolean | undefined) => void;
    open: (value: boolean | undefined) => void;
}

const FormButton: React.FC<Props> = ({setToggleForm, toggleForm, open}) => {
  const [toggleBtnHoverText, setToggleBtnHoverText] = useState(false)

  return (
    <>
    <div className={`${toggleBtnHoverText? 'fixed' : 'hidden'} bottom-20 right-5 border border-gray-200 p-1 text-[11px] font-medium rounded-lg bg-gray-100`}>
      Create Task
    </div>
    <Button 
        className={`shadow-lg ${classes.button} ${toggleForm? '!bg-red-500': ''} transition-all duration-500'`}
        onMouseEnter={() => setToggleBtnHoverText(!toggleBtnHoverText)}
        onMouseLeave={() => setToggleBtnHoverText(!toggleBtnHoverText)}
        // onClick={() => setToggleForm(!toggleForm)}
        onClick={() => open}
    >
        <IconPlus size={30} className={` ${toggleForm? 'rotate-45 transition-all duration-500' : 'transition-all duration-500'}  `}/>
    </Button>
    </>
  )
}
export default FormButton
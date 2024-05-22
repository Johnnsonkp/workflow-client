import { Box, Button, Group, LoadingOverlay } from '@mantine/core';

import React from 'react'
import { useDisclosure } from '@mantine/hooks';

export const LoadingContainer = ({children, className, loading}) => {
  const [visible, { toggle }] = useDisclosure(true);
  const loadingObj = loading
  // const isLoaded = children? children : <LoadingOverlay visible={true}
  //                                         zIndex={1000}
  //                                         overlayProps={{ radius: 'sm', blur: 2 }}
  //                                         loaderProps={{ color: 'pink', type: 'bars' }}
  //                                       />
  
  return (
    <div className={className}>
      {children}
        <LoadingOverlay 
          visible={children? false : true}
          // visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
    </div>
  )
}


// import { useDisclosure } from '@mantine/hooks';
// import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

// function Demo() {
//   const [visible, { toggle }] = useDisclosure(true);

//   // Note that position: relative is required
//   return (
//     <>
//       <Box pos="relative">
//         <LoadingOverlay
//           visible={visible}
//           zIndex={1000}
//           overlayProps={{ radius: 'sm', blur: 2 }}
//           loaderProps={{ color: 'pink', type: 'bars' }}
//         />
//         {/* ...other content */}
//       </Box>

//       <Group justify="center">
//         <Button onClick={toggle}>Toggle overlay</Button>
//       </Group>
//     </>
//   );
// }
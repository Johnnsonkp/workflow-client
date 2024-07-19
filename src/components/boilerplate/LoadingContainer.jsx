import { LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const LoadingContainer = ({children, className, loading}) => {
  const [visible, { toggle }] = useDisclosure(children? false : true);
  const loadingObj = loading
  
  return (
    <div className={className}>
      {children}
        <LoadingOverlay 
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
    </div>
  )
}
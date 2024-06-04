import React from 'react'

// interface MyComponentProps {
//   className?: string | any;
// }

// export const DefaultContainer: React.FC<React.PropsWithChildren<MyComponentProps>> = ({children, className}) => {
export const DefaultContainer = ({children, className}) => {
  
  return (
    <div className={className}>{children}</div>
  )
}

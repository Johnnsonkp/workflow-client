import React from 'react'

export const DefaultContainer = ({children, className}) => {
  
  return (
    <div className={className}>{children}</div>
  )
}

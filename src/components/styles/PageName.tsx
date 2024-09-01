import React from 'react'

interface IProps {
  children: React.ReactNode,
  className?: string
}

const PageName: React.FC<IProps> = ({ children, className }) => {
  return (
    <h2 style={{fontSize: '3.6rem', fontWeight: 600, letterSpacing: '.3px', marginBottom: '.5rem' }} className={className}>
      {children}
    </h2>
  )
}

export default PageName

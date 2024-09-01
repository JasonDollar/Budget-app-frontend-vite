import React from 'react'

import User from '../components/User'

interface Props {
  themeId: string
  changeAppTheme: (themeId: string) => void
}

const user: React.FC<Props> = ({ changeAppTheme, themeId }) => {
  return (
    <div>
      <User  changeAppTheme={changeAppTheme} themeId={themeId}/>
    </div>
  )
}

export default user

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../store'

import { selectUserSettings, selectUserCategories } from '../../store/selectors/user'

import { getThemeData } from '../styles/theme'
import CategoriesSettings from './CategoriesSettings'
import CurrencySettings from './CurrencySettings'
import ThemeSettings from './ThemeSettings'

const SettingContainer = styled.div`
  .appTheme {
    @media (min-width: 768px) {
      width: 50%;
    }
  }

  .themes {
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0;
  }
`

interface Props {
  changeAppTheme: (themeId: string) => void
  themeId: string
}

const UserSettings: React.FC<Props> = ({ changeAppTheme, themeId }) => {
  const [themes] = useState(() => getThemeData())
  const settings = useSelector<RootState, { currency: string, locale: string }>(selectUserSettings)
  const categories = useSelector<RootState, {    _id: string
    categoryName: string
    categoryColor: string
    categoryIcon: string}[] | undefined>(selectUserCategories)

  return (
    <SettingContainer>
      <div className="appTheme">
        <p>Choose app theme:</p>
        <div className="themes">
          <ThemeSettings themes={themes} themeId={themeId} changeAppTheme={changeAppTheme}/>
        </div>
        <div>
          <CurrencySettings userCurrency={settings?.currency}/>
        </div>
        <div>
          <CategoriesSettings categories={categories}/>
        </div>
      </div>
    </SettingContainer>
  )
}

export default UserSettings

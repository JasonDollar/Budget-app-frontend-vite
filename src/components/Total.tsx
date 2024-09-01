import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { calculateTotal, calculateTodayExpenses } from '../lib/calcMoney'
import formatMoney from '../lib/formatMoney'

import { selectUserSettings } from '../store/selectors/user'
import { selectAllExpenses } from '../store/selectors/expenses'

import TotalBox from './styles/TotalBox'
import { RootState } from '../store'
import { IUserSettings } from '../interfaces/user'
import { IExpense } from '../interfaces/expense'

interface Props {
  totalComponentHeight: number
  setTotalComponentHeight: (height: number) => void
}

const Total: React.FC<Props> = ({ totalComponentHeight, setTotalComponentHeight }) => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [todayAmount, setTodayAmount] = useState(0)
  const expenses = useSelector<RootState, IExpense[]>(selectAllExpenses)
  const { currency, locale } = useSelector<RootState, IUserSettings>(selectUserSettings)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const totalAmountCalc = calculateTotal(expenses)
    const todayExpense = calculateTodayExpenses(expenses)
    setTotalAmount(totalAmountCalc)
    setTodayAmount(todayExpense)
  }, [expenses])
  
  useEffect(() => {
    if (!boxRef.current?.clientHeight) return
    setTotalComponentHeight(boxRef.current?.clientHeight)
  }, [])

  // console.log(totalComponentHeight)
  
  return (
    <TotalBox ref={boxRef} boxSize={totalComponentHeight} totalAmountLength={totalAmount.toString().length}>
      <p className="header">Total</p>
      <div className="main">
        <div className="total">
          {formatMoney(totalAmount, currency, locale)}
        </div>
        <Link to='/addExpense' className="link">
          <span>+</span>
        </Link>
      </div>
      <p className="today">
        {formatMoney(todayAmount, currency, locale)} today
      </p>
    </TotalBox>
  )
}

export default Total

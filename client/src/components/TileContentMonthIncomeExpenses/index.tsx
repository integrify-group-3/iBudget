import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

import { DailyExpense } from '../../types/expenses'
import { TileContentProps } from '../../types/ui'
import { TileContentIncomeExpenses } from '../../types'

import './style.scss'

const useStyles = makeStyles((theme) => ({
  tileList: {
    margin: theme.spacing(1),
  },
  tileContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    position: 'absolute',
    backgroundColor: ' rgba(87, 146, 223, 0.5)',
    height: '4.6rem',
    width: '4.6rem',
    borderRadius: '50px',
  },
  previewIncomeExpenses: {
    minHeight: '5.6rem',
    width: '12rem',
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '0 1rem 1rem rgba(15, 15, 15, 0.4)',
    listStyle: 'none',
    top: '-30%',
    border: '1px solid lightgrey',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '2.3rem 2rem',
    fontSize: '13px',
    borderRadius: '5px',
    zIndex: 2,
    lineHeight: '1.8',
  },
  previewIncomeExpensesDate: {
    fontWeight: 700,
  },
  previewExpensesItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '1px solid lightgrey',
  },
}))

export default function TileContentMonthIncomeExpenses({
  date,
  view,
  tileContentData,
  activeStartDate,
}: any) {
  const classes = useStyles()
  const [loadTileContent, setLoadTileContent] = useState(false)
  const [tileIncomeExpenses, setTileIncomeExpenses] = useState({
    month: '',
    income: 0,
    expenses: 0,
  } as TileContentIncomeExpenses)
  const [tileLoaded, setTileLoaded] = useState(false)
  const [isShowing, setIsShowing] = useState(false)

  const loadTiles = useCallback(async () => {
    try {
      //this will prevent to keep reloaded tiles when switching year
      setTileLoaded(false)
      console.log(tileContentData)
      const foundMonth = await tileContentData.find(
        (data: any) => data.month === moment(date).format('MMMM').slice(0, 3)
      )
      setTileIncomeExpenses(foundMonth)
      if (tileIncomeExpenses.income > 0 || tileIncomeExpenses.expenses > 0) {
        // console.log('these they have income or expenses', tileIncomeExpenses)
        setTileLoaded(true)
      }
    } catch (err) {
      return err
    }
  }, [tileContentData, tileIncomeExpenses])

  useEffect(() => {
    setTimeout(() => {
      loadTiles()
    }, 500)
  }, [loadTiles])

  const showIncomeExpensesPreview = () => {
    setIsShowing(true)
  }

  const hideIncomeExpensesPreview = () => {
    setIsShowing(false)
  }
  //   console.log(tileIncomeExpenses)
  const { month, income, expenses } = tileIncomeExpenses
  if (!tileLoaded) return <div></div>
  return (
    <div
      className="tile-content"
      onMouseEnter={showIncomeExpensesPreview}
      onMouseLeave={hideIncomeExpensesPreview}
    >
      {isShowing && (
        <ul className={classes.previewIncomeExpenses}>
          <li className={classes.previewIncomeExpensesDate}>{month}</li>
          <li className={classes.previewIncomeExpensesDate}>Income: {income}</li>
          <li className={classes.previewIncomeExpensesDate}>Expenses: {expenses}</li>
        </ul>
      )}
    </div>
  )
}

import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import EventNoteIcon from '@material-ui/icons/EventNote';

import { DailyExpense } from '../../types/expenses'
import { TileContentProps } from '../../types/ui'

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
  previewExpenses: {
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
  eventNoteIcon: {
    fontSize: '19px',
    color: 'lightgrey',
    alignSelf: 'center',
    marginRight: '.4rem',    
  },
  previewExpensesDate: {
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#595565',
  },
  previewExpensesItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid lightgrey',
    marginLeft: '1.99em',
    color: '#0e0e0f',
  },
  amount: {
    fontWeight: 700,
    color: '#fd3865',
    marginLeft: '.4rem'
  }
}))

export default function TileContentMonthlyExpenses({
  date,
  view,
  contentData,
  activeStartDate
}: TileContentProps) {
  const classes = useStyles()  
  const [day, setDay] = useState({} as DailyExpense)
  const [loadTileContent, setLoadTileContent] = useState(false)
  const [tileLoaded, setTileLoaded] = useState(false)
  const [isShowing, setIsShowing] = useState(false)

  const loadTiles = useCallback(async () => {
      try {
        const selectedDay = await contentData.days.find(
          (d: any) => moment(d.day).format('LL') === moment(date).format('LL')
        )
        setDay(selectedDay)
        setLoadTileContent(true)
        if (view === 'month' && day !== undefined && loadTileContent) {
          if (day.expenses !== undefined && day.expenses.length > 0) {
            setTileLoaded(true)
          }
        }
      }
      catch(err) {
        return err
      }
  }, [contentData, day, loadTileContent, tileLoaded])

  useEffect(() => {
    setTimeout(() => {
      loadTiles()
    }, 500)
  }, [loadTiles])

  const showExpensesPreview = () => {
    setIsShowing(true)
  }
  const hideExpensesPreview = () => {
    setIsShowing(false)
  }

  if (!tileLoaded || !day || day.expenses.length < 1) return <div></div>

  return (
    <div
      className="tile-content"
      onMouseEnter={showExpensesPreview}
      onMouseLeave={hideExpensesPreview}
    >
      {isShowing && (
        <ul className={classes.previewExpenses}>
          <li className={classes.previewExpensesDate}>
          <EventNoteIcon className={classes.eventNoteIcon} />
            <span>{day.day}</span>
            </li>
          {day.expenses.map((e: any) => (
            <>
              <li key={e._id} className={classes.previewExpensesItem}>
                <span>{e.category}</span>
                <span className={classes.amount}>€{e.amount}</span>
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  )
}

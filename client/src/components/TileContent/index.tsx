import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

import { DailyExpense, TileContentProps } from '../../types'

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
      width: '8rem',
      position: 'absolute',
      backgroundColor: 'white',
      boxShadow: '0 2rem 2rem rgba(15, 15, 15, 0.4)',
      listStyle: 'none',
      top: '-30%',
      border: '1px solid lightgrey',
      display: 'flex',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '2.3rem 2rem',
      fontSize: '13px',
      borderRadius: '3px'
  },
  previewExpensesItem: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',

  }
}))

export default function TileContent({
  date,
  view,
  viewMonth
}: TileContentProps) {
  const classes = useStyles()
  const [day, setDay] = useState({} as DailyExpense)
  const [loadContent, setLoadContent] = useState(false)
  const [tileLoaded, setTileLoaded] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
//   console.log('from tile content', viewMonth)
//   console.log('tile loaded', tileLoaded)
  useEffect(() => {
    setTimeout(() => {
        if (viewMonth !== undefined) {
            const selectedDay = viewMonth.days.find(
              (d: any) => moment(d.day).format('LL') === moment(date).format('LL')
            ) 
            // console.log(viewMonth)
            setDay(selectedDay)
            setLoadContent(true)
            if (view === 'month' && day !== undefined && loadContent) {
                console.log('here from first useEffect')
                setTileLoaded(true)
            }
        }
    }, 2000);  
  }, [day, loadContent, tileLoaded])

  useEffect(() => {
    if (view === 'month' && day !== undefined && loadContent) {
        console.log('here')
        setTileLoaded(true)
    }
  }, [view, day, tileLoaded])
  const showExpensesPreview = () => {
    setIsShowing(true)
  }
  const hideExpensesPreview = () => {
    setIsShowing(false)
  }
    // if (view === 'month' && day !== undefined && loadContent) {
        //we only want to display the first expense on the tile content
        // day.expenses.length = 1
    if(tileLoaded) {
      return (
        <div className={classes.tileContent}
          onMouseEnter={showExpensesPreview}
          onMouseLeave={hideExpensesPreview}
        >
        {
            isShowing &&
            <ul className={classes.previewExpenses}>
                 {day.expenses.map((e: any) => (
            <>
              <li key={e._id} className={classes.previewExpensesItem}>{e.category} {e.amount}</li>
            </>
          ))}
            </ul>
            
        }
         
        </div>
      )
    } else {
      return null 
    }
}

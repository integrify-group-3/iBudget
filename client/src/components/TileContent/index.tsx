import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

import { DailyExpense, TileContentProps } from '../../types'

const useStyles = makeStyles((theme) => ({
  tileList: {
    margin: theme.spacing(1),
  },
}))

export default function TileContent({
  date,
  view,
  viewMonth
}: TileContentProps) {
  const classes = useStyles()
  const [day, setDay] = useState({} as DailyExpense)
  const [loadContent, setLoadContent] = useState(false)
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
        }
    }, 2000);  
  }, [day, loadContent])
   
    if (view === 'month' && day !== undefined && loadContent) {
        //we only want to display the first expense on the tile content
        // day.expenses.length = 1
      return (
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            listStyle: 'none',
            position: 'relative',
            fontSize: '12px'
          }}
        >
          {day.expenses.map((e: any) => (
            <>
              <li key={e._id}>{e.category}</li>
              <li>{e.amount}</li>
            </>
          ))}
        </ul>
      )
    } else {
      return null 
    }
}

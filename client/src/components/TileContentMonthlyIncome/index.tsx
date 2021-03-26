import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import EventNoteIcon from '@material-ui/icons/EventNote'

import { ViewMonth } from '../../types'
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
  previewIncome: {
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
    borderRadius: '8px',
    zIndex: 2,
    lineHeight: '1.8',
  },
  previewIncomeDate: {
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#595565',
  },
  eventNoteIcon: {
    fontSize: '19px',
    color: 'lightgrey',
    alignSelf: 'center',
    marginRight: '.4rem',
  },
  previewIncomeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid lightgrey',
    marginLeft: '1.99em',
    color: '#0e0e0f',
  },
  tileContentList: {
    listStyle: 'none',
  },
  amount: {
    fontWeight: 700,
    marginLeft: '.4rem',
    color: '#42A5F5',
  }
}))

export default function TileContentMonthlyIncome({
  contentData,
  date,
  view,
}: any) {
  const classes = useStyles()
  const [loadTileContent, setLoadTileContent] = useState(false)
  const [month, setMonth] = useState({} as ViewMonth)
  const [tileLoaded, setTileLoaded] = useState(false)
  const [isShowing, setIsShowing] = useState(false)

  const loadTIles = useCallback(async () => {
    try {
      console.log(contentData)
      setTileLoaded(false)
      const foundMonth = await contentData.find(
        (data: any) => data.name === moment(date).format('MMMM')
      )
      setMonth(foundMonth)
      setLoadTileContent(true)
      // console.log('month here', month)
      if (month.income !== undefined && loadTileContent && view === 'year') {
        if (month.income.length > 0) {
          setTileLoaded(true)
        }
      }
    } catch (err) {
      return err
    }
  }, [contentData, month, loadTileContent])

  useEffect(() => {
    setTimeout(() => {
      loadTIles()
    }, 1000)
  }, [loadTIles])

  const showIncomesPreview = () => {
    setIsShowing(true)
  }
  const hideIncomesPreview = () => {
    setIsShowing(false)
  }

  if (!tileLoaded || !month || month.income.length < 1) return <div></div>

  return (
    <div
      className="tile-content"
        onMouseEnter={showIncomesPreview}
        onMouseLeave={hideIncomesPreview}
    >
      {isShowing && (
        <ul className={classes.previewIncome}>
          <li className={classes.previewIncomeDate}>
            <EventNoteIcon className={classes.eventNoteIcon} />
            <span>{month.name}</span>
          </li>
          {month.income.map((income: any) => (
            <>
              <li className={classes.previewIncomeItem}>
                <span>{income.category}</span>
                <span className={classes.amount}>€{income.amount}</span> 
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  )
}

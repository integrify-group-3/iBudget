import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

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
  previewIncomes: {
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
    alignItems: 'center',
    padding: '2.3rem 2rem',
    fontSize: '13px',
    borderRadius: '5px',
    zIndex: 2,
    lineHeight: '1.8',
  },
  previewIncomesDate: {
    fontWeight: 700,
  },
  previewIncomesItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '1px solid lightgrey',
  },
}))

export default function TileContentIncome({ contentData, date, view }: any) {
  const classes = useStyles()
  const [loadTileContent, setLoadTileContent] = useState(false)
  const [monthName, setMonthName] = useState('')
  const [contentIncome, setContentIncome] = useState([])
  const [tileLoaded, setTileLoaded] = useState(false)
  const [isShowing, setIsShowing] = useState(false)

  const loadTIles = useCallback(async () => {
    try {
      const foundMonth = await contentData.find(
        (data: any) => data.name === moment(date).format('MMMM')
      )

      setLoadTileContent(true)
      if (
        foundMonth.income !== undefined &&
        loadTileContent &&
        view === 'year'
      ) {
        if (foundMonth.income.length > 0) {
          setMonthName(foundMonth.name)
          setContentIncome(foundMonth.income)
          setTileLoaded(true)
        }
      }
    } catch (err) {
      return err
    }
  }, [tileLoaded, loadTileContent, contentData])

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

  if (!tileLoaded) return <div></div>

  return (
    <div
      // className={classes.tileContent}
      className="tile-content"
      onMouseEnter={showIncomesPreview}
      onMouseLeave={hideIncomesPreview}
    >
      {isShowing && (
        <ul className={classes.previewIncomes}>
          <li className={classes.previewIncomesDate}>{monthName}</li>
          {contentIncome.map((income: any) => (
            <>
              <ul key={income._id} style={{ listStyle: 'none' }}>
                <li className={classes.previewIncomesItem}>
                  {income.category} {income.amount}
                </li>
              </ul>
            </>
          ))}
        </ul>
      )}
    </div>
  )
}

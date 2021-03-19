import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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
  previewExpensesDate: {
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

export default function TileContentIncome(props: any) {
  const classes = useStyles()
  console.log(props)
  return (
    <div>
      <p>Data goes here</p>
    </div>
  )
}

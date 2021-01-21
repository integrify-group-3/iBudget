import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { AppState, AddIncomeProps } from '../../types'
import { addIncome } from '../../redux/actions/income'
import SaveButton from '../SaveButton';
import { fetchIncome } from '../../redux/actions/income'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      save: {
        border: 'none',
        background: 'none'
      }
  }),
);

export default function AddIncome({ year, month, openForm, handleClose, updateMonthlyIncome }: AddIncomeProps) {
  const dispatch = useDispatch()
  const updatedIncome = useSelector((state: AppState) => state.income.income)

  const classes = useStyles();
  const [income, setIncome] = useState({
      category: '',
      description: '',
      amount: '',
      year: year,
      month: month
  })
  const {category, description, amount} = income

  useEffect(() => {
    console.log(updatedIncome)
    updateMonthlyIncome(updatedIncome)
  }, [])

  const handleSubmit = (e: any) => {
      e.preventDefault()
      dispatch(addIncome(income))
      handleClose()
      setTimeout(() => {
        console.log('income should update here', updatedIncome)
        updateMonthlyIncome(updatedIncome)
      }, 3000);   
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setIncome({
        ...income, [name]: value
    })
  }
  return (
      <div>
        <h4>Add income</h4>
       <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
       <InputLabel id="demo-simple-select-label">Category</InputLabel>
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          name="category"
        //   size="small"
          onChange={handleChange}
        >
          <MenuItem value="salary">Salary</MenuItem>
          <MenuItem value="investments">Investments</MenuItem>
          <MenuItem value="real estate">Real Estate</MenuItem>
          <MenuItem value="unemployment benefits">Unemployment Benefits</MenuItem>
          <MenuItem value="tax return">Tax Return</MenuItem>
          <MenuItem value="child allowance">Child Allowance</MenuItem>
        </Select>
        
        <TextField 
        value={description}
        name="description"
        variant="outlined"
        size="small"
        id="standard-basic" 
        label="description" 
        onChange={handleChange}/>

        <TextField 
        value={amount}
        name="amount"
        variant="outlined"
        size="small"
        id="standard-basic" 
        type="number"
        label="amount" 
        onChange={handleChange}/>
        <button className={classes.save}><SaveButton /></button>
    </form>
    </div>
   
  );
}
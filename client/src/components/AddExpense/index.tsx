import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import moment from 'moment';
import ClearIcon from '@material-ui/icons/Clear';

import { AppState, AddExpenseProps } from '../../types'
import { addExpense } from '../../redux/actions/expenses'
import SaveButton from '../SaveButton';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  select: {
    width: '11.5rem',
  },
  save: {
    border: 'none',
    background: 'none'
  }
}));

export default function AddExpense({
  expense,
  day,
  category,
  description,
  amount,
  setExpense,
  hideFormOnClick,
  closeForm,
  updateDailyExpenses
}: AddExpenseProps) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const updatedExpenses = useSelector((state: AppState) => state.expenses.dailyExpenses)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(expense);
    dispatch(addExpense(expense))
    closeForm()
    setTimeout(() => {
      // updateDailyExpenses(updatedExpenses)
    }, 3000);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  useEffect(() => {
    console.log('calling back from here', updatedExpenses)
  }, [])

  return (
    <div>
      <div className={classes.paper}>
        <div className="form-container">
          <h3>{moment(day).format('LL')}</h3>
          <form onSubmit={handleSubmit} className={classes.root}>
            <div className={classes.header}><ClearIcon onClick={hideFormOnClick} /></div> 
            <h4>New Expense</h4>
            <div className="input-topics">
              <InputLabel id="demo-simple-select-outlined-label">
                  Select category
                  </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                className={classes.select}
                // size="small"
                value={category}
                onChange={handleChange}
                required={true}
              >
                <MenuItem value="housing">Housing</MenuItem>
                <MenuItem value="transport">Transport</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
                <MenuItem value="travel">Travel</MenuItem>
              </Select>
            </div>

            <div className="input-topics">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="description (rent, car)"
                onChange={handleChange}
                name="description"
                value={description}
                required={true}
              />
            </div>

            <div className="input-topics">
              <TextField
                type="number"
                id="outlined-basic"
                variant="outlined"
                label="amount"
                onChange={handleChange}
                name="amount"
                value={amount}
                required={true}
              />
            </div>
            <button className={classes.save}><SaveButton /></button>
            {/* <button onClick={hideFormOnClick}>Cancel</button> */}
          </form>
        </div>
      </div>
      {/* </Fade> */}
      {/* </Modal>  */}
    </div>
  );
}

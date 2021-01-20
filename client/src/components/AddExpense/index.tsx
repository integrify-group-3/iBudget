import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import moment from 'moment';
import ClearIcon from '@material-ui/icons/Clear';

import { AddExpenseProps } from '../../types'
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
  save: {
    border: 'none',
    background: 'none'
  }
}));

export default function AddExpense({
  expense,
  setExpense,
  day,
  category,
  description,
  amount,
  addExpense,
  hideFormOnClick
}: AddExpenseProps) {
  const classes = useStyles();
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(expense);
    axios.post("http://localhost:3000/api/v1/expenses", expense).then((res) => {
      console.log(res.data);
      addExpense(res.data)
    });   
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
    console.log(expense);
  };

  return (
    <div>
      <div className={classes.paper}>
        <div className="form-container">
          <h3>{moment(day).format('LL')}</h3>
          <form onSubmit={handleSubmit} className={classes.root}>
            {/* <div className={classes.header}><ClearIcon onClick={hideFormOnClick} /></div> */}
            <h4>New Expense</h4>
            <div className="input-topics">
              <InputLabel id="demo-simple-select-outlined-label">
                  Select category
                  </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
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

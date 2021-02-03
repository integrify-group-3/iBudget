import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Title from '../Title'
import AddExpenseBtn from '../../components/AddExpenseBtn'
import EditExpense from '../../components/EditExpense'
import { AppState, ExpensesTableProps, Expense } from '../../types'
import { removeExpense } from '../../redux/actions/expenses'

const useStyles = makeStyles((theme) => ({
  addExpense: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editExpense: {
    color: 'lightblue',
    cursor: 'pointer',
  },
  deleteExpense: {
    color: 'red',
    cursor: 'pointer',
  },
  editExpenseContainer: {
    backgroundColor: 'rgba(25, 20, 20, 0.6)',
    position: 'absolute',
    height: '200vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    top: '0',
    left: '17px',
    zIndex: 2 
  },
  editExpenseFormContainer: {
    position: 'fixed',
    top: '27%'
  },
}))

export default function ExpensesTable({
  day,
  dailyExpense,
  showFormOnClick,
  updateDailyExpenses
}: ExpensesTableProps) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const updatedExpenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const [editOpen, setEditOpen] = useState(false)
  const [expenseId, setExpenseId] = useState('')

  const openEditOnClick = (id: string) => {
    setExpenseId(id)
    setEditOpen(true)
  }
  const hideFormOnClick = () => {
    setEditOpen(false)
  }
  const deleteExpenseOnClick = (id: string, expense: Expense) => {
    dispatch(removeExpense(id, expense))
  }
  
  useEffect(() => {
    // console.log('I am running from expense table')
    updateDailyExpenses(updatedExpenses)
  }, [updatedExpenses])

  return (
    <React.Fragment>
      <Title>Expenses for {moment(day).format('LL')}</Title>
      <Table size="small">
        {dailyExpense.expenses !== undefined &&
        dailyExpense.expenses.length > 0 ? 
          <>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            {editOpen &&
               <Grid item xs={12} md={12} lg={12} className={classes.editExpenseContainer}>
               <Paper className={classes.editExpenseFormContainer}>
                <EditExpense
                  key={expenseId}
                  expenseId={expenseId}
                  day={day}
                  dailyExpense={dailyExpense}
                  hideFormOnClick={hideFormOnClick}
                />
              </Paper>
              </Grid>
              }
              <TableBody>
                {dailyExpense.expenses.map((expense: any) => {
                  const { _id, category, description, amount } = expense
                  return (
                    <>
                      <TableRow key={_id}>
                        <TableCell>{category}</TableCell>
                        <TableCell>{description}</TableCell>
                        <TableCell>{amount}</TableCell>
                        <TableCell>
                          <EditIcon
                            className={classes.editExpense}
                            onClick={() => openEditOnClick(_id)}
                          />
                        </TableCell>
                        <TableCell>
                          <DeleteIcon
                            className={classes.deleteExpense}
                            onClick={() => deleteExpenseOnClick(_id, expense)}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  )
                  })}
                <div className={classes.addExpense}>
                  <AddExpenseBtn showFormOnClick={showFormOnClick} />
                </div>
              </TableBody>
          </>
         : 
          <>
            <p>No expenses recorded</p>
            <AddExpenseBtn showFormOnClick={showFormOnClick} />
          </>
        }
      </Table>
    </React.Fragment>
  )
}

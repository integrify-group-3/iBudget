import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery, useTheme } from '@material-ui/core'
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
import { Expense } from '../../types/expenses'
import { ExpensesTableProps } from '../../types/ui'
import { removeExpense } from '../../redux/actions/expenses'

const useStyles = makeStyles((theme) => ({
  tableBody: {
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
    },
  },
  tableRow: {},
  tableCell: {
    padding: '6px 0px 6px 16px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 !important',
    },
  },
  amount: {
    color: '#865CFF',
    fontWeight: 700,
  },
  editExpense: {
    margin: theme.spacing(1),
    color: 'lightblue',
  },
  deleteBtn: {
    margin: theme.spacing(1),
    color: '#ff3a56',
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
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      left: '0',
    },
  },
  editExpenseFormContainer: {
    position: 'fixed',
    top: '27%',
  },
}))

export default function ExpensesTable({
  day,
  dailyExpense,
  showFormOnClick,
}: ExpensesTableProps) {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()
  const [editOpen, setEditOpen] = useState(false)
  const [expenseId, setExpenseId] = useState('')

  const openEditOnClick = (id: string) => {
    setExpenseId(id)
    setEditOpen(true)
  }
  const hideFormOnClick = () => {
    setEditOpen(false)
  }
  const deleteOnClick = (id: string, expense: Expense) => {
    dispatch(removeExpense(id, expense))
  }
  return (
    <React.Fragment>
      <Title>Expenses for {moment(day).format('LL')}</Title>
      <Table size="small">
        {dailyExpense.expenses !== undefined &&
        dailyExpense.expenses.length > 0 ? (
          <>
            <TableHead>
              {!mobile && (
                <>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>
                      <span style={{ marginLeft: '1.3rem' }}>Edit</span>
                    </TableCell>
                    <TableCell>
                      <span style={{ marginLeft: '0.5rem' }}>Delete</span>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableHead>
            {editOpen && (
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                className={classes.editExpenseContainer}
              >
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
            )}
            <TableBody className={classes.tableBody}>
              {dailyExpense.expenses.map((expense: any) => {
                const {
                  _id,
                  category,
                  description,
                  amount,
                  icon,
                  iconStyle,
                } = expense
                return (
                  <>
                    <TableRow key={_id} className={classes.tableRow}>
                      <TableCell className={classes.tableCell}>
                        <i
                          className={icon}
                          style={{
                            color: `${iconStyle}`,
                            fontSize: '1.3rem',
                            marginRight: '.4rem',
                            opacity: '0.9',
                          }}
                          title={category}
                        ></i>
                        {!mobile && <span>{category}</span>}
                      </TableCell>
                      <TableCell>{description}</TableCell>
                      <TableCell className={classes.amount}>
                        €{amount}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <IconButton
                          aria-label="edit"
                          className={classes.editExpense}
                          onClick={() => openEditOnClick(_id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <IconButton
                          aria-label="delete"
                          className={classes.deleteBtn}
                          onClick={() => deleteOnClick(_id, expense)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                )
              })}
              <AddExpenseBtn showFormOnClick={showFormOnClick} />
            </TableBody>
          </>
        ) : (
          <>
            <p>No expenses recorded</p>
            <AddExpenseBtn showFormOnClick={showFormOnClick} />
          </>
        )}
      </Table>
    </React.Fragment>
  )
}

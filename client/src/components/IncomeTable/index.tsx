import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery, useTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Title from '../Title'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'

import { removeIncome } from '../../redux/actions/income'
import { Income } from '../../types/income'
import { IncomeTableProps } from '../../types/ui'
import AddIncomeBtn from '../AddIncomeBtn'
import EditIncome from '../EditIncome'

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 0,
  },
  tableBody: {
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
    },
  },
   tableCell: {
    padding: '6px 0px 6px 16px',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 0px 6px 6px',
    },
  },
  deleteBtn: {
    margin: theme.spacing(1),
    color: '#ff3a56',
  },
  incomeList: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  editIncome: {
    color: 'lightblue',
    cursor: 'pointer',
  },
  editIncomeContainer: {
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
  editIncomeFormContainer: {
    position: 'fixed',
    top: '27%',
  },
}))

export default function IncomeTable({
  year,
  month,
  monthlyIncome,
  showFormOnClick
}: IncomeTableProps) {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [editOpen, setEditOpen] = useState(false)
  const [IncomeId, setIncomeId] = useState('')
  const dispatch = useDispatch()
  const [openForm, setOpenForm] = React.useState(false)
  
  const openEditOnClick = (id: string) => {
    setIncomeId(id)
    setEditOpen(true)
    setOpenForm(false)

  }

  const hideFormOnClick = () => {
    setEditOpen(false)
  }

  const handleClose = () => {
    setOpenForm(false)
  }

  const deleteOnClick = (id: string, income: Income) => {
    dispatch(removeIncome(id, income))
  }

  return (
    <React.Fragment>
      {!openForm ? (
        <>
          {month && year && (
            <Title>
              Income for {month} {year}
            </Title>
          )}
          <Table size="small">
            {monthlyIncome === null ? (
              <Typography component="p" variant="h6">
                No income registered
              </Typography>
            ) : (
              <>
                <TableHead>
                {
                !mobile &&
                <>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>
                      <span style={{ marginLeft: '0.7rem' }}>Edit</span>
                    </TableCell>
                    <TableCell>
                      <span style={{ marginLeft: '0.6rem' }}>Delete</span>
                    </TableCell>
                  </TableRow>
                  </>
                }
                </TableHead>
                {editOpen && (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className={classes.editIncomeContainer}
                  >
                    <Paper className={classes.editIncomeFormContainer}>
                      <EditIncome
                        incomeId={IncomeId}
                        hideFormOnClick={hideFormOnClick}
                        monthlyIncome={monthlyIncome}
                        month={month}
                        year={year}
                      />
                    </Paper>
                  </Grid>
                )}
                <TableBody className={classes.tableBody}>
                  {monthlyIncome &&
                    monthlyIncome.map((income: any) => {
                      const {
                        _id,
                        category,
                        description,
                        amount,
                        icon,
                        iconStyle,
                      } = income
                      return (
                        <TableRow key={_id}>
                          <TableCell className={classes.tableCell}>
                            <i
                              className={icon}
                              style={{
                                fontSize: '1.3rem',
                                marginRight: '.4rem',
                                color: `${iconStyle}`,
                              }}
                            ></i>
                            { !mobile && <span>{category}</span> }
                          </TableCell>
                          <TableCell>{description}</TableCell>
                          <TableCell>€{amount}</TableCell>

                          <TableCell className={classes.tableCell}>
                            <IconButton
                              className={classes.editIncome}
                              onClick={() => openEditOnClick(income._id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <IconButton
                              aria-label="delete"
                              className={classes.deleteBtn}
                              onClick={() => deleteOnClick(income._id, income)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </>
            )}
            <AddIncomeBtn showFormOnClick={showFormOnClick} />
          </Table>
        </>
      ) : (
        <>
        <p>No expenses recorded</p>
        <AddIncomeBtn showFormOnClick={showFormOnClick} />
      </>
      )}
    </React.Fragment>
  )
}

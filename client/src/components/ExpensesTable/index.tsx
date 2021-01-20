import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
// import EditExpense from "../../components/EditExpense";
import { ExpensesTableProps } from '../../types'

const useStyles = makeStyles((theme) => ({
  addExpense: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editExpense: {
    color: "lightblue",
    cursor: "pointer",
  },
}));

export default function ExpensesTable({
  day,
  dailyExp,
  showFormOnClick,
  removeExpense,
  updateExpenses
}: ExpensesTableProps) {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  console.log('daily expenses', dailyExp)
  const openEditOnClick = (id: any) => {
    setEditOpen(true);
  };
  const closeEditOnClick = () => {
    setEditOpen(false);
  };

  const deleteExpenseOnClick = (id: any) => {
    axios.delete(`/api/v1/expenses/${id}`).then((res) => {
      removeExpense();
    });
  };
  return (
    <React.Fragment>
      <Title>Expenses for {moment(day).format("LL")}</Title>
      <Table size="small">
        {dailyExp.expenses !== undefined && dailyExp.expenses.length > 0 ? (
          <>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyExp.expenses.map((expense: any) => {
                const { _id, category, description, amount } = expense;
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
                            onClick={() => deleteExpenseOnClick(_id)}
                          />
                        </TableCell>
                      </TableRow>
                  </>
                );
              })}
            </TableBody>
            <div className={classes.addExpense}>
              <button onClick={showFormOnClick} className="add-new">
                Add New
              </button>
            </div>
          </>
        ) : (
          <>
            <p>No expenses recorded</p>
            <button onClick={showFormOnClick} className="add-new">
              Add New
            </button>
          </>
        )}
      </Table>    
    </React.Fragment>
  );
}

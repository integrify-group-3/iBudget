import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'

import Title from '../Title'
import { AppState } from '../../types/'
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

export default function ProfileDashboard({ income }: any) {
  const user = useSelector((state: AppState) => state.user.user)

  const classes = useStyles()
  const date = new Date()
  const formattedDate = moment(date).format('LL')

  return (
    <React.Fragment>
      <Title>
        {user.firstName} {user.lastName}
      </Title>
      <Typography component="p" variant="h4">
        ${income}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {formattedDate}
      </Typography>
      <div>
        <NavLink to="/income" color="primary">
          Update Income
        </NavLink>
      </div>
    </React.Fragment>
  )
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ScheduleIcon from '@material-ui/icons/Schedule'
import PersonIcon from '@material-ui/icons/Person'

import Title from '../Title'
import { ProfileDashboardProps } from '../../types'
import { formattedCurrentDate } from '../../utils/dateValues'

const useStyles = makeStyles({
  userLink: {
    textDecoration: 'none',
    color: '#865cff',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: '.4rem',
  },
  depositContext: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  monthlyBudgetText: {
    color: '#865cff',
    fontWeight: 700,
  },
  clockIcon: {
    color: 'lightgrey',
    marginRight: '.3rem',
  },
})

export default function ProfileDashboardBudget({
  totalBudget,
  year,
  month,
  user,
}: ProfileDashboardProps) {
  const classes = useStyles()
  const { id, firstName, lastName } = user
  return (
    <React.Fragment>
      <Title>
        <div className={classes.userLink}>
          <NavLink
            to={`/user/${id}`}
            color="primary"
            className={classes.userLink}
          >
            <PersonIcon />{' '}
            <span className={classes.userDetails}>
              {firstName} {lastName}
            </span>
          </NavLink>
        </div>
      </Title>
      <Typography
        component="p"
        variant="h4"
        className={classes.monthlyBudgetText}
      >
        <Title>
          My budget {month} {year}
        </Title>{' '}
        €{totalBudget}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        <ScheduleIcon className={classes.clockIcon} />
        {formattedCurrentDate}{' '}
      </Typography>
    </React.Fragment>
  )
}

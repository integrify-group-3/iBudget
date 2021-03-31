import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import HomeIcon from '@material-ui/icons/Home'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import PersonIcon from '@material-ui/icons/Person'

import { NavbarSecondaryListItemsProps } from '../../types/ui'

import './style.scss'

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  opacity: '0.9',
}
const navIconStyle = {
  color: 'white',
  opacity: '0.9',
}

export const MainListItems = ({ user }: NavbarSecondaryListItemsProps) => {
  return (
    <>
      <NavLink
        to="/dashboard"
        className="nav-link"
        activeClassName="nav-link-active"
        title="Dashboard"
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon style={navIconStyle} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>
      <NavLink
        to="/income"
        className="nav-link"
        activeClassName="nav-link-active"
        title="Income"
      >
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon style={navIconStyle} />
          </ListItemIcon>
          <ListItemText primary="Income" />
        </ListItem>
      </NavLink>
      <NavLink
        to="/expenses"
        className="nav-link"
        activeClassName="nav-link-active"
        title="Expenses"
      >
        <ListItem button>
          <ListItemIcon>
            <MoneyOffIcon style={navIconStyle} />
          </ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItem>
      </NavLink>
      <NavLink
        to="/analytics"
        className="nav-link"
        activeClassName="nav-link-active"
        title="Analytics"
      >
        <ListItem button>
          <ListItemIcon>
            <TrendingUpIcon style={navIconStyle} />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
      </NavLink>
      <NavLink
        to={`/user/${user.id}`}
        className="nav-link"
        activeClassName="nav-link-active"
        title="User Profile"
      >
        <ListItem button>
          <ListItemIcon>
            <PersonIcon style={navIconStyle} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </NavLink>
    </>
  )
}

export const secondaryListItems = (
  <>
    <NavLink
      exact to="/"
      className="nav-link"
      activeClassName="nav-link-active"
      title="Home"
    >
      <ListItem button>
        <ListItemIcon>
          <HomeIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/register"
      className="nav-link"
      activeClassName="nav-link-active"
      title="Sign up"
    >
      <ListItem button>
        <ListItemIcon>
          <PersonAddIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Sign up" />
      </ListItem>
    </NavLink>

    <NavLink
      to="/login"
      className="nav-link"
      activeClassName="nav-link-active"
      title="Sign in"
    >
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Sign in" />
      </ListItem>
    </NavLink>
  </>
)

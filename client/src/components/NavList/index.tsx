import React from 'react'
import { NavLink } from 'react-router-dom'

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
import logo from '../../imgs/logo.svg'

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
const styleActive = {
  color: '#4112c7',
  background: 'white',
}

export const MainListItems = ({ user }: NavbarSecondaryListItemsProps) => {
  return (
    <div>
      <ListSubheader style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <NavLink to="/dashboard" title="Dashboard" style={linkStyle}>
          <img src={logo} alt="app logo" style={{ marginLeft: '0.2rem' }} />
          <span style={{ marginLeft: '1.65rem', color: 'white' }}>IBudget</span>
        </NavLink>
      </ListSubheader>
      <NavLink
        to="/dashboard"
        style={linkStyle}
        activeStyle={styleActive}
        activeClassName="nav-link"
        className="nav-link"
        title="Dashboard"
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon style={navIconStyle} className="active" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>
      <NavLink
        to="/income"
        style={linkStyle}
        activeStyle={styleActive}
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
        style={linkStyle}
        activeStyle={styleActive}
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
        style={linkStyle}
        activeStyle={styleActive}
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
        style={linkStyle}
        activeStyle={styleActive}
        title="User Profile"
      >
        <ListItem button>
          <ListItemIcon>
            <PersonIcon style={navIconStyle} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </NavLink>
    </div>
  )
}

export const secondaryListItems = (
  <div>
    <ListSubheader style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <NavLink to="/" title="Home">
        <img src={logo} alt="app logo" style={{ marginLeft: '0.2rem' }} />
        <span style={{ marginLeft: '1.65rem', color: 'white' }}>IBudget</span>
      </NavLink>
    </ListSubheader>
    <NavLink
      to="/register"
      style={linkStyle}
      activeStyle={styleActive}
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
      style={linkStyle}
      activeStyle={styleActive}
      title="Sign in"
    >
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Sign in" />
      </ListItem>
    </NavLink>
    <NavLink to="/" style={linkStyle} activeStyle={styleActive} title="Home">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </NavLink>
  </div>
)

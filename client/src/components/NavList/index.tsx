import React from 'react'
import { NavLink } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import HomeIcon from '@material-ui/icons/Home'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DashboardIcon from '@material-ui/icons/Dashboard'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import PersonIcon from '@material-ui/icons/Person'

import logo from '../../imgs/logo.svg'

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  opacity: '0.9',
}
const navIconStyle = {
  color: 'white',
  opacity: '0.9',
}

export const mainListItems = (
  <div>
    <ListSubheader style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <img src={logo} alt="app logo" style={{ marginLeft: '0.2rem' }} />
      <span style={{ marginLeft: '1.65rem', color: 'white' }}>IBudget</span>
    </ListSubheader>
    <NavLink to="/expenses">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    <NavLink to="/income" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <AccountBalanceWalletIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Income" />
      </ListItem>
    </NavLink>
    <NavLink to="/expenses" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <MoneyOffIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Expenses" />
      </ListItem>
    </NavLink>
    <NavLink to="/analytics" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <TrendingUpIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Analytics" />
      </ListItem>
    </NavLink>
    <NavLink to="/profile" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </NavLink>
  </div>
)

export const secondaryListItems = (
  <div>
    <ListSubheader style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <img src={logo} alt="app logo" style={{ marginLeft: '0.2rem' }} />
      <span style={{ marginLeft: '1.65rem', color: 'white' }}>IBudget</span>
    </ListSubheader>
    <NavLink to="/register" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <PersonAddIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Sign up" />
      </ListItem>
    </NavLink>
    <NavLink to="/login" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Sign in" />
      </ListItem>
    </NavLink>
    <NavLink to="/" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon style={navIconStyle} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </NavLink>
  </div>
)

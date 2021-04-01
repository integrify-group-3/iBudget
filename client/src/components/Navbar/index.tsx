import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import { Button, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { NavLink } from 'react-router-dom'
import FaceIcon from '@material-ui/icons/Face'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { AppState } from '../../types'
import { logout } from '../../redux/actions/user'
import { MainListItems } from '../NavList'
import { secondaryListItems } from '../NavList'
import { mobileScreen } from '../../utils/windowSize'
import logo from '../../imgs/logo.svg'

const drawerWidth = 190

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: '#865CFF',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      //marginRight: mobileScreen ? 0 : 36,
      marginRight: 36,
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    arrowIcon: {
      color: 'white',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      backgroundColor: '#865CFF',
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: '#865CFF',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: '#865CFF',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      //width: `${mobileScreen ? '0' : theme.spacing(7) + 1}`,
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      [theme.breakpoints.down('sm')]: {
        width: 0,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      backgroundColor: '#865CFF',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100vw',
    },
    navLogo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'white',
    },
    appTitle: {
      marginLeft: '.5rem',
      //display: `${mobileScreen ? 'none' : 'inline-block'}`,
      display: 'inline-block',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    headerUser: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '20rem',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      overflow: 'auto',
    },
    userContainer: {
      width: '10rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userLink: {
      textDecoration: 'none',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //marginLeft: `${mobileScreen ? '16.4rem' : '.4rem'}`,
      marginLeft: '.4rem',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '16.4rem',
      },
    },
    userImgContainer: {
      display: 'inline-block',
      overflow: 'hidden',
      height: '32px',
      width: '32px',
      objectFit: 'cover',
      marginLeft: '.4rem',
      borderRadius: '50%',
    },
    userPictureIcon: {
      fontSize: '32px',
    },
    userImg: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
    btnStyle: {
      borderRadius: 50,
      width: '32%',
      textAlign: 'center',
      marginLeft: '2rem',
      padding: '.3rem',
      height: '1.7rem',
    },
    logoutIcon: {
      color: 'white',
    },
  })
)

const Navbar = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const user = useSelector((state: AppState) => state.user.user)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const logoutOnClick = () => {
    dispatch(logout())
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.header} noWrap>
            <NavLink
              to={`${isAuthenticated ? `/dashboard` : `/`}`}
              className={classes.navLogo}
            >
              <img src={logo} alt="app logo" style={{ marginLeft: '0.2rem' }} />
              <span className={classes.appTitle}>iBudget</span>
            </NavLink>
            {isAuthenticated && (
              <Typography className={classes.headerUser}>
                <span className={classes.userContainer}>
                  <NavLink to={`/user/${user.id}`} className={classes.userLink}>
                    {!mobile && (
                      <span>
                        Hello {user.firstName} {user.lastName}
                      </span>
                    )}
                    <div className={classes.userImgContainer}>
                      {user.picture ? (
                        <img
                          src={user.picture}
                          alt={user.firstName}
                          className={classes.userImg}
                        />
                      ) : (
                        <FaceIcon className={classes.userPictureIcon} />
                      )}
                    </div>
                  </NavLink>
                </span>
                {mobile ? (
                  <ExitToAppIcon
                    // className={classes.logoutIcon}
                    // component={NavLink}
                    to={'/'}
                    onClick={logoutOnClick}
                  />
                ) : (
                  <Button
                    component={NavLink}
                    to={'/'}
                    color="secondary"
                    variant="contained"
                    className={classes.btnStyle}
                    onClick={logoutOnClick}
                  >
                    Logout
                  </Button>
                )}
              </Typography>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon className={classes.arrowIcon} />
            ) : (
              <ChevronLeftIcon className={classes.arrowIcon} />
            )}
          </IconButton>
        </div>
        {isAuthenticated ? (
          <>
            <Divider />
            <List onClick={handleDrawerClose}>
              <MainListItems user={user} />
            </List>
          </>
        ) : (
          <>
            <Divider />
            <List onClick={handleDrawerClose}>{secondaryListItems}</List>
          </>
        )}
      </Drawer>
    </div>
  )
}

export default Navbar

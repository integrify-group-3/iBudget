import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Income from '../pages/Income'
import Expenses from '../pages/Expenses'
import Analytics from '../pages/Analytics'
import User from '../pages/User'
import UpdateUser from '../pages/UpdateUser'

const Routes = () => {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={(props: any) => <Login {...props} />} />
      <Route exact path="/dashboard" component={(props: any) => <Dashboard {...props} />} />
      <Route exact path="/income" component={(props: any) => <Income {...props}/>} />
      <Route exact path="/expenses" component={(props: any) => <Expenses {...props}/>} />
      <Route exact path="/analytics" component={(props: any) => <Analytics {...props}/>} />
      <Route exact path="/user" component={(props: any) => <User {...props}/>} />
      <Route exact path="/user/:id" component={(props: any) => <UpdateUser {...props}/>} />
    </Switch>
  </>
  )
 
}

export default Routes

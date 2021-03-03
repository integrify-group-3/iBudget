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
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

const Routes = () => {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={(props: any) => <Home {...props} />} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={(props: any) => <Login {...props} />} />
      <Route exact path="/dashboard" component={(props: any) => <Dashboard {...props} />} />
      <Route exact path="/income" component={(props: any) => <Income {...props}/>} />
      <Route exact path="/expenses" component={(props: any) => <Expenses {...props}/>} />
      <Route exact path="/analytics" component={(props: any) => <Analytics {...props}/>} />
      <Route exact path="/user/:id" component={(props: any) => <User {...props}/>} />
      <Route exact path="/user/:id/edit" component={(props: any) => <UpdateUser {...props}/>} />
      <Route exact path="/forgot-password" component={(props: any) => <ForgotPassword {...props}/>} />
      <Route exact path="/reset-password/:token" component={(props: any) => <ResetPassword {...props}/>} />
    </Switch>
  </>
  )
 
}

export default Routes

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { AppState, CalendarScheduler } from '../types'
import { User } from '../types/user'
import { DailyExpense } from '../types/expenses'
import createRootReducer from './reducers'
import rootSaga from './sagas'

const initState: AppState = {
  product: {
    inCart: [],
  },
  ui: {
    dialogOpen: {},
  },
  user: {
    user: {} as User,
    token: '',
    isAuthenticated: false,
    isGoogleUser: false,
    forgotPasswordEmailMsg: '',
    resetPasswordMsg: '',
  },
  income: {
    calendar: {} as CalendarScheduler,
    income: [],
    selectedMonth: {},
    total: 0,
    selectedYear: {},
    isUpdating: false
  },
  expenses: {
    calendar: {} as CalendarScheduler,
    selectedYear: {},
    selectedMonth: {},
    dailyExpenses: {} as DailyExpense,
    total: 0,
  },
  error: {
    msg: {},
    status: null,
  },
  validation: {
    validated: false,
  },
}

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // const temp = localStorage.getItem('reduxState')
  // const persistedState = temp ? JSON.parse(temp) : {}

  //using saga as the above localstorage throws an error after a while and requires oftern to clear the local storage
  const localState = localStorage.getItem('app-state')
  localState && (initialState = JSON.parse(localState))

  const store = createStore(
    createRootReducer(),
    initialState,
    // persistedState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })
  return store
}

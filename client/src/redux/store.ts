import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { AppState, User, CalendarScheduler, DailyExpense } from '../types'
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
  },
  income: {
    calendar: {} as CalendarScheduler,
    income: [],
  },
  expenses: {
    calendar: {} as CalendarScheduler,
    selectedYear: {},
    selectedMonth: {},
    dailyExpenses: {} as DailyExpense,
    total: 0
  },
  error: {
    msg: {},
    status: null
  },
  validation: {
    validated: false
  }
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

  const temp = localStorage.getItem('reduxState')
  const persistedState = temp ? JSON.parse(temp) : {}

  const store = createStore(
    createRootReducer(),
    persistedState,
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

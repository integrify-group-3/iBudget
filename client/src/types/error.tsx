
export const SHOW_ERRORS = 'SHOW_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export type ShowErrorAction = {
    type: typeof SHOW_ERRORS
    payload: {
      msg: string
      status?: number
    }
  }
  
  export type ClearErrorAction = {
    type: typeof CLEAR_ERRORS
  }

  export type ErrorActions = ShowErrorAction | ClearErrorAction

  export type ErrorState = {
    msg: any
    status?: any
  }

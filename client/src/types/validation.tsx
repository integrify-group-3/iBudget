export const SHOW_VALIDATIONS = 'SHOW_VALIDATIONS'
export const CLEAR_VALIDATIONS = 'CLEAR_VALIDATIONS'

export type ShowValidationAction = {
    type: typeof SHOW_VALIDATIONS
  }
  
  export type ClearValidationAction = {
    type: typeof CLEAR_VALIDATIONS
  }
  
  export type ValidationActions = ShowValidationAction | ClearValidationAction 

  export type ValidationState = {
    validated: boolean
  }
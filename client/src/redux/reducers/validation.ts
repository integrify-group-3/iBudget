import {
    ValidationState,
    ValidationActions,
    SHOW_VALIDATIONS,
    CLEAR_VALIDATIONS,
  } from '../../types'
    
  export default function error(
    state: ValidationState = {
      validated: false,
    },
    action: ValidationActions
  ): ValidationState {
    switch (action.type) {
    case SHOW_VALIDATIONS:
      console.log('from reducer validations')
      return {
        ...state,
        validated: false,
      }
    case CLEAR_VALIDATIONS:
      console.log('from reducer validations')
      return {
        ...state,
        validated: false,
      }
    default:
      return state
    }
  }
    
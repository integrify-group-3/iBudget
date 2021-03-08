import { SHOW_VALIDATIONS, CLEAR_VALIDATIONS, ValidationActions } from '../../types/validation'

export function showValidation(): ValidationActions {
    return {
      type: SHOW_VALIDATIONS,
    }
  }

export function clearValidation(): ValidationActions {
  return {
    type: CLEAR_VALIDATIONS,
  }
}
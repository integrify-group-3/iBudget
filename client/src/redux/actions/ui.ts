import {
  TOGGLE_DIALOG,
  UiActions,
  DialogType,
} from '../../types'

export function toggleDialog(dialog: DialogType): UiActions {
  return {
    type: TOGGLE_DIALOG,
    payload: {
      dialog,
    }
  }
}


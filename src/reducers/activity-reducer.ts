import { Activity } from '../types'

export type ActivityActions = {
  type: 'save-activity'
  payload: { newActivity: Activity }
}

export type ActivityState = {
  activityes: Activity[]
}

export const initialState: ActivityState = {
  activityes: [],
}

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === 'save-activity') {
    // Este codigo maneja la logica para actualizar el state
    console.log('desde el tyope save-activity')
  }
}

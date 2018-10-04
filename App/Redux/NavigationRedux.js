import AppNavigation from '../Navigation/AppNavigation'
const initialState = AppNavigation.router.getStateForAction(AppNavigation.router.getActionForPathAndParams('LaunchScreen'));

export const reducer = (state = initialState, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}

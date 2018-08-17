import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['user', 'isAuthenticated'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isAuthenticated: false,
  user: {}
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectAvatar: state => state.User.avatar
}

/* ------------- Reducers ------------- */

// login
export const login = (state, action) => {
  const { user, isAuthenticated } = action
  return state.merge({ isAuthenticated, user })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
})

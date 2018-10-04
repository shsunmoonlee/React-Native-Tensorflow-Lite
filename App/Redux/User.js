import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['payload'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isAuthenticated: false,
  jwt: undefined,
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectAvatar: state => state.user.avatar
}

/* ------------- Reducers ------------- */

// login
export const login = (state, action) => {
  const { user, isAuthenticated, jwt } = action.payload
  console.log("====action.payload", action.payload)
  return state.merge({ isAuthenticated, ...user, jwt })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
})

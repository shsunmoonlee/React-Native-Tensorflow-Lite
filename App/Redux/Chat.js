import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loadMessages: [],
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  messages: [],
})

/* ------------- Selectors ------------- */

export const ChatSelectors = {
  selectAvatar: state => state.Chat.avatar
}

/* ------------- Reducers ------------- */

// login
export const loadMessages = (state, action) => {
  const { } = action
  return state.merge({ messages })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_MESSAGES]: loadMessages,
})

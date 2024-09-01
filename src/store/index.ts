import { createStore, applyMiddleware } from "redux"
import { thunk } from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers"

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export default store;
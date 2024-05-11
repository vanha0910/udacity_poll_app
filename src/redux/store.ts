import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './auth/authenticationSlice'
import questionReducer from './question/questionsSlice'

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  questions: questionReducer
})
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
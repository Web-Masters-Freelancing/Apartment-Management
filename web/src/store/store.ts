import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/store/api/baseApi'
import snackbarReducer from '@/store/slice/snackbarSlice'

const reducer = combineReducers({
  // apis
  [baseApi.reducerPath]: baseApi.reducer,

  // slices
  snackbar: snackbarReducer,
})

const middleware = [baseApi.middleware]

/**
 * The redux store for the application.
 * @public
 */
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...middleware,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['snackbar/setSnackbarProps'],
        ignoredPaths: ['snackbar.snackbarProps.onClose'],
      },
    }),
  ],
})

/**
 * The top level redux state for the application.
 */
export type RootState = ReturnType<typeof reducer>

/**
 * The redux dispatch function type.
 */
export type AppDispatch = typeof store.dispatch

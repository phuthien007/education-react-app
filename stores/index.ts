import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import commonReducer from './slices/CommonSlice';
// Logger with default options
import {createLogger} from 'redux-logger';

const logger = createLogger({
  actionTransformer: action => ({
    ...action,
    type: String(action.type),
  }),
  collapsed: true,
  diff: true,
  errorTransformer: error => ({
    ...error,
    message: error.message,
  }),
  predicate: () => true,
  stateTransformer: state => state,
  timestamp: true,
  duration: true,
  colors: {
    title: () => '#139BFE',
    prevState: () => '#1C5FAF',
    action: () => '#149945',
    nextState: () => '#A47104',
    error: () => '#ff0005',
  },
  level: {
    prevState: false,
    nextState: false,
    error: 'error',
  },
});

export const store = configureStore({
  reducer: {
    commonState: commonReducer,
  },
  // @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reconciliationReducer from '../reducers/reconciliationSlice';

const rootReducer = combineReducers({
  reconciliation: reconciliationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

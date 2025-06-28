import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  internal_data: [],
  provider_data: [],
};

const reconciliationSlice = createSlice({
  name: 'reconciliation',
  initialState,
  reducers: {
    setInternalData: (state, action) => {
      state.internal_data = action.payload;
    },
    setProviderData: (state, action) => {
      state.provider_data = action.payload;
    },
    clearReconciliationData: (state) => {
      state.internal_data = [];
      state.provider_data = [];
    },
  },
});

export const { setInternalData, setProviderData, clearReconciliationData } = reconciliationSlice.actions;


const selectReconciliation = (state) => state.reconciliation;

export const selectInternalData = createSelector(
  [selectReconciliation],
  (recon) => recon.internal_data
);

export const selectProviderData = createSelector(
  [selectReconciliation],
  (recon) => recon.provider_data
);

export default reconciliationSlice.reducer;

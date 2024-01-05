import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';

// Define a type for the slice state
interface CommonState {
  loading: boolean;
  status: 'error' | 'success' | 'idle';
}

// Define the initial state using that type
const initialState: CommonState = {
  loading: false,
  status: 'idle',
};

export const commonSlice = createSlice({
  name: 'commonState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetState: state => {
      state.loading = false;
    },
  },
});

export const {setLoading, resetState} = commonSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCommonState = (state: RootState) => state.commonState;

export default commonSlice.reducer;

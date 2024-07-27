import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState = { value: 0 } satisfies CounterState as CounterState

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    newActiveIndex(state, action: PayloadAction<number>) {
      state.value = action.payload
    },

  },
})

export const { newActiveIndex } = counterSlice.actions
export const activeIndexSlice = counterSlice.reducer